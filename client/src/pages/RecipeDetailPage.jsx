import React, {useState, useEffect} from 'react';
import toast from 'react-hot-toast';
import api from '../api/axiosConfig';
import {useParams} from 'react-router-dom';
import Slider from 'react-slick';
import ShareButtons from '../components/ShareButtons';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './RecipeDetailPage.css';

function RecipeDetailPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [recipe, setRecipe] = useState(null);
  const {recipeId} = useParams();

  useEffect(() => {
    setIsLoading(true);
    const feachRecipe = async () => {
      try {
        const response = await api.get(`/recipes/${recipeId}`);
        setRecipe(response.data);
        console.log('레시피 데이터:', response.data);
      } catch (err) {
        console.error('레시피 로딩 실패:', err);
        toast.error('레시피 정보를 가져오는 도중 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    };
    feachRecipe();
  }, [recipeId]);

  isLoading && <p className="loading-message">레시피 정보를 불러오는 중입니다.</p>;

  return (
    <div className="page-container recipe-detail-container">
      <h1 className="recipe-title">{recipe?.title || '알수없음'}</h1>
      <div className="recipe-meta">
        <span>작성자: {recipe?.creator?.username || '알수없음'}</span>
        <span>카테고리: {recipe?.category || '알수없음'}</span>
        <span>조리시간: {recipe?.content?.cookingTime || '알수없음'}</span>
      </div>
      <div className="main-image">
        <img src={recipe?.imageUrl?.mainImage} alt={recipe?.title} />
      </div>
      <div className="description">
        <h2>레시피 설명</h2>
        <p>{recipe?.content?.description}</p>
      </div>
      <div className="ingredients">
        <h2>재료</h2>
        <ul className="ingredients-items">
          {recipe?.content?.ingredients?.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>
      {recipe?.imageUrl?.recipeImage?.length > 0 && (
        <div className="recipe-images">
          <h2>조리 과정 이미지</h2>
          <Slider
            dots={true}
            infinite={true}
            speed={500}
            slidesToShow={1}
            slidesToScroll={1}
            adaptiveHeight={true}>
            {recipe.imageUrl.recipeImage.map((imgUrl, index) => (
              <div key={index}>
                <img
                  src={imgUrl}
                  alt={`조리과정 ${index + 1}`}
                  style={{width: '100%', height: 'auto'}}
                />
              </div>
            ))}
          </Slider>
        </div>
      )}

      {recipe && <ShareButtons recipe={recipe} />}
    </div>
  );
}

export default RecipeDetailPage;
