import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import api from "../api/axiosConfig";
import { useParams } from "react-router-dom";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
// import "./RecipeDetailPage.css";

function RecipeDetailPage () {
    const [ isLoading, setIsLoading ] = useState(true);
    const [ recipe, setRecipe ] = useState(null);
    const { recipeId } = useParams();

    useEffect(() => {
        setIsLoading(true);
        const feachRecipe = async () => {
                try {
                const response = await api.get(`/recipes/${recipeId}`);
                setRecipe(response.data);
            } catch(error) {
                toast.error('레시피 정보를 가져오는 도중 오류가 발생했습니다.');
            } finally {
                setIsLoading(false);
            }
        };
        feachRecipe();
    },[recipeId]);

    isLoading && <p className="loading-message">레시리 정보를 불러오는 중입니다.</p>;
    
    return (
        <div className="page-container">
            <h1>레시피 상세 정보가 표시됩니다.</h1>
        </div>
    )
}

export default RecipeDetailPage;