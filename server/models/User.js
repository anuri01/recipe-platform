import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim : true, maxlength: 20},
    username: { type: String, required: true, trim: true, unique: true, maxlength: 20 },
    password: { type: String, trim: true, minlength: 6, maxlength: 30, select: false},
    email: { type: String, trim: true },
    address: {
        postcode: { type: String },
        address1: { type: String },
        address2: { type: String }
    },
    phoneNumber: { type: String },
    interests: { type: [String], enum: ['Korean', 'Western', 'Chinese', 'Japanese', 'Baking', 'Pastry'] },
    naverId: { type: String, unique: true, sparse: true },
    kakaoId: { type: String, unique: true, sparse: true },
    role: { type: String, enum:['admin', 'user'], default: 'user'}
}, { timestamps: true });

// --- 3. 설계도에 규칙(pre-save hook) 추가 ---
// (질문에 대한 답) 일반 회원가입 시에만 비밀번호 암호화가 필요하므로,
// API 로직에서 비밀번호가 있을 때만 처리하도록 하고, 스키마에서는 required를 뺍니다.
// next를 인자로 넘거야 함.

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) {
        return next;
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt); // 2번째 인자로 솔트 전달 
        next();
    } catch (error) {
        next(error);
    }
})

export default mongoose.model('User', userSchema);