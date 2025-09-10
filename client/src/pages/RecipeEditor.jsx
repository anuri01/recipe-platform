import React, { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import './RecipeEditor.css';

function RecipeEditor () {
    const [ title, setTitle ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ cookingTime, setCookingTime ] = useState(0);
    const [ ingredients, setIngredients ] = useState(['']);
    const [ mainImgaeFile, setMainImageFile ] = useState(null);
    const [ recipeImageFile, setRecipeImageFile ] = useState([])
    const [ isLodading, setIsLoading ] = useState(false);

    const formData = new FormData();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

        }
    }

    formData = {
        title: title,
        content : {
            description: description,
            cookingTime: cookingTime,
            ingredients: ingredients,
        },
    }

    return (
        <div className="page-container">
            <div className="content-header">
                <h1>래시피 등록</h1>
                
            </div>
            <form onSubmit={handleSubmit} className="form-section">

            </form>
        </div>
    )


}

export default RecipeEditor;