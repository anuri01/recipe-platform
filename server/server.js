//const bcrypt = require('bcryptjs'); // 기본 require 방식
// ES Module 사용(리액트와 맞춤) package.json에 type을 module로 설정 필요
import 'dotenv/config';
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken"
import User from './models/User.js';
import Recipe from './models/Recipe.js';
import upload from './upload.js';
import { s3 } from './upload.js';

// express 앱 설정
const app = express();

// express 미들웨어 설정
app.use(cors()); // cross orgin 설정
app.use(express.json());
app.use(express.urlencoded({extended: true})) // 옛날 방식 데이터 주고받을때. 

const PORT = process.env.PORT || 4700;

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('레시피 플랫폼 DB에 연결되었습니다.'))
    .catch(err => console.error('DB연결 실패', err))

// --- API 라우트 영역 ---
app.get('/api', (req, res) => {
    res.send('레시피 플랫폼 API 서버입니다.');
});

// 로그인 체크 미들웨어 
const authmiddleware =  async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({message: '토큰이 확인되지 않습니다.'});
        }

        const token = authHeader.split(' ')[1]; // 접두어와 토근 사이 공백으로 구분해 배열로 저장 후 토큰 할당
        const decoded = jwt.verify(token, process.env.JWT_SECRET) // 토큰을 시크리릿로 검증

        req.user = { id: decoded.id, username: decoded.username, role: decoded.role}
        return next();
    } catch (error) {
        res.status(500).json({message: '서버 오류가 발생(인증)'});
    }

}

// 사용자 로그인 api
app.post('/api/users/login', async ( req, res ) => {
    try {
        const { password, username } = req.body;
        
        if (!username || !password) {
            return res.status(400).json({message: '아이디와 비밀번호를 모두 입력해주세요.'});
        }
        
        const user = await User.findOne({username}).select('+password'); // password 필수로 가져오기
        if (!user) {
            return res.status(400).json({message: '아이디와 비밀번호를 확인하세요.'});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({message: '아이디와 비밀번호를 확인하세요.'});
        }

        // 토큰 생성(토큰제 저장할 정보 + 시크릿 키 + 유효시간(선택)
        const token = jwt.sign(
            { id: user._id, username: user.username, role: user.role },
            process.env.JWT_SECRET,
            {expiresIn: '1h'},
        );

        res.json({token, user, message: '로그인 성공'});

    } catch (error) {
        return res.status(500).json({message: '로그인 중 에러가 발생했습니다.'})
    }

})

// 회원가입 api
app.post('/api/users/signup', async ( req, res ) => {
    try {
        const { username, password, name, email, address, phoneNumber, interests } = req.body;

        // 필수값 체크 - 소셜로그인 시 비멀번호 필수값에서 제외
        if (!username || !password || !name) {
            return res.status(400).json({ message: '모든 팔수 항목을 입력해주세요.' });
        }

        // 이미 존재하는 아이디 체크
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ message: '이미 사용중인 아이디 입니다.' });
        }

        // 비밀번호 해싱은 pre로 처리
        // const hashedPassword = await bcrypt.hash(password, 10);

        // 사용자 생성
        const user = new User({
            username,
            name,
            email,
            password,
            address,
            phoneNumber,
            interests,
        });

        await user.save();

        res.status(201).json({ message: '회원가입이 완료되었습니다.' });
    } catch (error) {
        res.status(500).json({ message: '회원가입 중 오류가 발생했습니다.', error: error.message });
    }
});

//회원정보 수정
app.put('/api/users/:id', async ( req, res ) => {

})

// 레시피 목록 조회
app.get('/api/recipes', async ( req, res ) => { 

})

// 레시피 등록
app.post('/api/recipes', 
    authmiddleware, 
    upload.fields([
         {name: 'mainImage', maxCount: 1},
         {name: 'recipeImages', maxCount:10}]),
        async ( req, res ) => {

        try {
        const { title, content, category } = req.body;
        const parsedContent = JSON.parse(content); // JSON 파싱

        console.log('Files:', req.files);  // 디버깅용
        console.log('Body:', req.body);    // 디버깅용
        console.log('content:', parsedContent);    // 디버깅용

        // 파일 URL 처리 
        const mainImageUrl = req.files.mainImage ? req.files.mainImage[0].location : null;
        const recipeImageUrl = req.files.recipeImages ? req.files.recipeImages.map(file => file.location) : [];

        if(!title || !content || !category || !mainImageUrl) {
            return res.status(400).json({message: '필수 항목 입력을 확인해 주세요'});
        }

        const newRecipe = new Recipe({
            title: title,
            content: parsedContent,
            category: category,
            imageUrl: {
                mainImage : mainImageUrl,
                recipeImage: recipeImageUrl,
            },
            creator: req.user.id,
        })
        // 저장 후 해당 객체를 전달해야 id가 전달됨.
        const recipeInfro = await newRecipe.save();
        res.status(201).json(recipeInfro);


        } catch (error) {
            console.error('레시피 등록중 오류 발샘', error)
            res.status(500).json({message: '서버 오류 발생'})
        }

}) 

// 레시피 수정
app.put('/api/recipes/:id', async ( req, res ) => {


})

// 레시피 상세
app.get('api/recipes/:id', async ( req, res ) => {
    try {
        const { recipeId } = req.params;
        const recipe = await Recipe.findById(recipeId).populate('creator', 'username');

        if(!recipe) {
            return res.status(404).json({message : '레시피를 찾을 수 없습니다.'});
        };

        res.status(200).json(recipe);

        } catch (error) {
            res.status(500).json({message: '서버 오류 발생'});
    }
});

// 레시피 삭제
app.delete('api/recipes/:id', async ( req, res ) => {

})

app.listen(PORT, () => {
    console.log(`테디레시피 서버가 http://localhost:${PORT}`);
})