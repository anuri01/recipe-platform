import React, { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api/axiosConfig";
import './RecipeEditor.css';

function RecipeEditor () {
    const [ title, setTitle ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ cookingTime, setCookingTime ] = useState(0);
    const [ ingredients, setIngredients ] = useState(['']);
    const [ mainImageFile, setMainImageFile ] = useState(null);
    const [ recipeImageFiles, setRecipeImageFiles ] = useState([])
    const [ isLodading, setIsLoading ] = useState(false);

     // 재료 입력창 변경 핸들러
    const handleIngredientChange = (index, value) => {
        const newIngredients = [...ingredients];
        newIngredients[index] = value;
        setIngredients(newIngredients);
    };

    // 재료 입력창 추가 버튼
    const addIngredientField = () => {
        setIngredients([...ingredients, '']);
    };
    
    // 재료 입력창 삭제 버튼
    const removeIngredientField = (index) => {
        const newIngredients = ingredients.filter((_, i) => i !== index);
        setIngredients(newIngredients);
    };


    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        
        if(!title || !description || !cookingTime || !ingredients || !mainImageFile) {
            toast.error('제목과 레시피 내용을 필수 입니다.');
        }

        formData.append('title', title);
        // 배열이나 객체는 문자열로 변환해 보내야 한다!!
        formData.append('content', JSON.stringify({description, cookingTime, ingredients}));
        formData.append('mainImage', mainImageFile);
        recipeImageFiles.forEach(file => {formData.append('recipeImageFiles', file)});

        try {
            setIsLoading(true)
            await api.post('/api/recipes', formData);
            toast.success('레시피가 등록되었습니다.');
        
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
                <div className="form-group file-attach">
                    <label>메인 이미지<span style={{ color: "red" }}>(필수)</span></label>
                    <div className="file-attach-group">
                    <p className="fileName">{ mainImageFile ? mainImageFile.name : '완성된 요리 이미지를 등록하세요'} </p>
                    <label htmlFor="mainImage" className="action-button button-primary">파일선택</label>
                    <input id="mainImage" type="file" onChange={(e) => setMainImageFile(e.target.files[0])} required />
                    </div>
                </div>
                <div className="form-group">
                    <label>필요재료</label>
                    {ingredients.map((ingredient, index) => (
                        <div key={index} className="ingredient-input-group">
                            <input
                                className="input-text"
                                type="text"
                                value={ingredient}
                                onChange={(e) => handleIngredientChange(index, e.target.value)}
                                placeholder="예: 계란 2개"
                            />
                            {ingredients.length > 1 && (
                                <button type="button" onClick={() => removeIngredientField(index)} className="remove-btn">삭제</button>
                            )}
                        </div>
                    ))}
                    <button type="button" onClick={addIngredientField} className="add-btn">+ 재료 추가</button>
                </div>

            </form>
        </div>
    )


}

export default RecipeEditor;