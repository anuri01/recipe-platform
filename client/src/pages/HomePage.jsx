import React, {useState, useEffect} from 'react';
import api from '../api/axiosConfig';
import RecipeSlider from '../components/RecipeSilder';
import './HomePage.css';
import toast from 'react-hot-toast';

function HomePage() {
  const [latestRecipes, setLatestRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchLatestRecipes = async () => {
      try {
        const response = await api.get('/recipes');
        setLatestRecipes(response.data);
      } catch (error) {
        console.error('레시피 호출 실패', error);
        toast.error('최신 레시피를 불러오지 못했습니다.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchLatestRecipes();
  }, []);

  isLoading && <p className="loading-message">화면을 불러오는 중입니다.</p>;

  return (
    <div className="page-container">
      <RecipeSlider recipes={latestRecipes}></RecipeSlider>
    </div>
  );
}

export default HomePage;
