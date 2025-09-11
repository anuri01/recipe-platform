import React, { useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api/axiosConfig";
import './RecipeEditor.css';

function RecipeEditor () {
    const [ title, setTitle ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ cookingTime, setCookingTime ] = useState('');
    const [ ingredients, setIngredients ] = useState([]);
    const [ currentIngredients, setCurrentIngredients ] = useState('');
    const [ mainImageFile, setMainImageFile ] = useState(null);
    const [ recipeImageFiles, setRecipeImageFiles ] = useState([]);
    const [ category, setCategory ] = useState('Korean');
    const [ isLodading, setIsLoading ] = useState(false);
    const navigate = useNavigate();

      const clickToCancel = () => {
            // 이전 페이지로 이동
            navigate(-1);
        }

    // 재료 입력창 추가 버튼
    const addIngredient = () => {
        if(currentIngredients.trim()) {
        setIngredients([...ingredients, currentIngredients.trim()]); // 현재 입력재료를 재료 배열에 입력
        setCurrentIngredients(''); // 입력창 초기화
        } else {
            toast.error('재료를 입력해 주세요.');
        }
    };
    
    // 재료 입력창 삭제 버튼
    const removeIngredientField = (index) => {
        const newIngredients = ingredients.filter((_, i) => i !== index);
        setIngredients(newIngredients);
    };

      // 조리 이미지 삭제 버튼
    const removeRecipeImage = (index) => {
        const NewRecipeImages = recipeImageFiles.filter((_, i) => i !== index);
        setRecipeImageFiles(NewRecipeImages);
    };


    // 엔터키로 재료 추가
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addIngredient();
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        
        if(!title || !description || !cookingTime || ingredients.length === 0 || !category || !mainImageFile) {
            toast.error('모든 필수 항목을 입력해주세요.');
            return;
        }

        formData.append('title', title);
        formData.append('category', category);
        // 배열이나 객체는 문자열로 변환해 보내야 한다!!
        formData.append('content', JSON.stringify({description, cookingTime, ingredients}));
        formData.append('mainImage', mainImageFile);
        recipeImageFiles.forEach(file => {formData.append('recipeImages', file)});

        try {
            setIsLoading(true)
            const response = await api.post('/recipes', formData);
            toast.success('레시피가 등록되었습니다.');
            navigate(`recipes/${response.data._id}`)
        
        } catch(error) {
            toast.error('레시피 등록에 실패했습니다.')
            console.error('레시피 등록 실패', error)

        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="page-container">
            <div className="content-header">
                <img src="/images/large_logo.png" className="logo-image"></img>
                <h1>래시피 등록</h1>
                <p>아빠의 특급 레시피를 등록하세요.</p>
                
            </div>
            <form onSubmit={handleSubmit} className="form-section">
                <div className="form-group require">
                    <label>레시피</label>
                    <input className="input-text"
                        type="text"
                        placeholder="레시피 제목을 입력하세요."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        maxLength={50}
                    />
                    <textarea className="input-textarea"
                        type="textarea"
                        placeholder="상세 레시피를 입력하세요."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        maxLength={5000}
                        />
                </div>
                <div className="form-group require">
                    <label>예상 조리시간</label>
                    <input className="input-text"
                        type="text"
                        placeholder="조리 시간을 입력하세요.(분)"
                        value={cookingTime} 
                        onChange={(e) => setCookingTime(e.target.value)}
                        maxLength={10}
                    />
                </div>
                
                <div className="form-group require">
                    <label>재료</label> 
                        <div className="ingredient-input-group">
                            <input
                                className="input-text"
                                type="text"
                                value={currentIngredients}
                                onChange={(e) => setCurrentIngredients(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="예: 계란 2개"
                            />
                            <button type="button" onClick={addIngredient} className="action-button button-primary">재료추가</button>
                        </div>                
                    { ingredients.length > 0 && (<ul className="ingredient-group">
                        {ingredients.map((ingredients, index) => (
                            <div key={index} className="ingredient-item">
                                <li className="ingredient-list">{ingredients}</li>
                                <button type="button" onClick={() => removeIngredientField(index)} className="remove-btn">X</button>
                            </div>
                        ))}
                    </ul>)}
                </div>
                     <div className="form-group file-attach">
                    <label>조리 이미지</label>
                    <div className="file-attach-group">
                    <p className="fileName">{ recipeImageFiles.length > 0 ? `${recipeImageFiles.length} 개 파일 선택됨` : '이미지를 등록하세요.(최대 10개)'} </p>
                    <label htmlFor="recipeImage" className="action-button button-primary">파일선택</label>
                    <input id="recipeImage" type="file" 
                        onChange={(e) => {
                            const selectedFile = e.target.files[0];
                            if(selectedFile) {
                            setRecipeImageFiles([...recipeImageFiles, selectedFile]);
                            e.target.value = ''; // 동일 파일 재선택 가능하게 인풋 초기화
                            }
                            }} />
                    </div>
                       { recipeImageFiles.length > 0 && (<ul className="ingredient-group">
                        {recipeImageFiles.map((recipeImg, index) => (
                            <div key={index} className="ingredient-item">
                                <li className="ingredient-list">{recipeImg.name}</li>
                                <button type="button" onClick={() => removeRecipeImage(index)} className="remove-btn">X</button>
                            </div>
                        ))}
                    </ul>)}
                </div>
                <div className="form-group file-attach">
                    <label>완성 이미지<span style={{ color: "red" }}>(필수)</span></label>
                    <div className="file-attach-group">
                    <p className="fileName">{ mainImageFile ? mainImageFile.name : '완성된 요리 이미지를 등록하세요'} </p>
                    <label htmlFor="mainImage" className="action-button button-primary">파일선택</label>
                    <input id="mainImage" type="file" onChange={(e) => setMainImageFile(e.target.files[0])} />
                    </div>
                </div>
                <div className="form-group">
                    <label>카테고리</label>
                    <div className="radio-group">
                        <label>
                            <input
                                type="radio"
                                name="category"
                                value="Korean"
                                checked={category === 'Korean'}
                                onChange={(e) => setCategory(e.target.value)}
                            />
                            한식
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="category"
                                value="Western"
                                checked={category === 'Western'}
                                onChange={(e) => setCategory(e.target.value)}
                            />
                            양식
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="category"
                                value="Chinese"
                                checked={category === 'Chinese'}
                                onChange={(e) => setCategory(e.target.value)}
                            />
                            중식
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="category"
                                value="Japanese"
                                checked={category === 'Japanese'}
                                onChange={(e) => setCategory(e.target.value)}
                            />
                            일식
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="category"
                                value="Pastry"
                                checked={category === 'Pastry'}
                                onChange={(e) => setCategory(e.target.value)}
                            />
                            디저트
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="category"
                                value="Baking"
                                checked={category === 'Baking'}
                                onChange={(e) => setCategory(e.target.value)}
                            />
                            제빵
                        </label>
                    </div>
                </div>
                <div className="cta-group">
                    <Link onClick={clickToCancel} className="button button-secondary sub">취소</Link>
                    <button type="submit" className="button button-primary main" disabled={isLodading}>
                        {isLodading ? '등록 중...' : '등록하기'}
                    </button>
                </div>
                
                    
            </form>
        </div>
    )


}

export default RecipeEditor;