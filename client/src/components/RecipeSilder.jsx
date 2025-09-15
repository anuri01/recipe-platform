import React, {useRef} from 'react';
import {Link} from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './RecipeSlider.css';

function RecipeSlider({recipes}) {
  const isDragging = useRef(false);
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1, // 2로 하면 기본적으로 2개 표시
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,

    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1
        }
      }
    ],
    beforeChange: () => {
      isDragging.current = true;
    },
    afterChange: () => {
      if (isDragging.current) {
        setTimeout(() => {
          isDragging.current = false;
        }, 0);
      }
    }
  };

  const handleLinkClick = (e) => {
    if (isDragging.current) {
      e.preventDefault();
    }
  };
  return (
    <div className="recipe-slider-container">
      <Slider {...settings}>
        {recipes.map((recipe) => (
          <div key={recipe._id} className="slider-item">
            <Link
              to={`/recipes/detail/${recipe._id}`}
              onClick={handleLinkClick}
              className="recipe-card-link">
              <div className="recipe-card">
                <div className="recipe-card-content">
                  <h3>{recipe.title}</h3>
                </div>
                <img
                  src={recipe.imageUrl.mainImage}
                  alt={recipe.title}
                  className="recipe-card-image"
                />
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default RecipeSlider;
