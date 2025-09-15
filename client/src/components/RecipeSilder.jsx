import React from 'react';
import {Link} from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './RecipeSlider.css';

function RecipeSlider({recipes}) {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1, // 기본적으로 2개 표시
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };
  return (
    <div className="recipe-slider-container">
      <Slider {...settings}>
        {recipes.map((recipe) => (
          <div key={recipe._id} className="slider-item">
            <Link to={`/recipes/detail/${recipe._id}`} className="recipe-card-link">
              <div className="recipe-card">
                <img
                  src={recipe.imageUrl.mainImage}
                  alt={recipe.title}
                  className="recipe-card-image"
                />
                <div className="recipe-card-content">
                  <h3>{recipe.title}</h3>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default RecipeSlider;
