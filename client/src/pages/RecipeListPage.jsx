import React, {useState, useEffect, use} from "react";
import { Link, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api/axiosConfig";
import "./RecipeListPage.css";

function RecipeListPage () {
  const [ recipeList, setRecipeList ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ searchTerm, setSearchTerm ] = useState('');
  const [ searchParams, setSearchParams ] = useSearchParams();

  useEffect(() => {
    const fetchRecipeList = async () => {
    setIsLoading(true)
      try {
        const keyword = searchParams.get('keyword') || '';
        const response = await api.get(`/recipes?keyword=${keyword}`);
        setRecipeList(response.data);
      } catch(error) {
        console.error('서버 오류', error);
        toast.error('레시피 목록을 불러오지 못했습니다.');
      } finally {
        setIsLoading(false)
        }
    }
    fetchRecipeList();
  }, [searchParams])

  if(isLoading) return <p className="loading-message"> 화면을 불러오는 중입니다.</p>

  return(
    <div className="page-container">
      <section className="search-form">

      </section>
      <h1>레시피 목록</h1>
      { recipeList.length > 0 ? (<ul className="recipe-list-group">
        {recipeList.map(item => (
          <Link to={`/recipes/detail/${item._id}`}><li key={item._id}> {item.title} </li></Link>
        ))}
        

      </ul> ) : (
        <p className="loading-message">등록된 레시피가 없습니다.</p>
      )}
      { !recipeList && <p>등록된 레시피가 없습니다.</p>}

    </div>
  )
}

export default RecipeListPage;