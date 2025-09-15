import React, {useState, useEffect} from 'react'
import {Link, useSearchParams, useLocation, useNavigate} from 'react-router-dom'
import toast from 'react-hot-toast'
import api from '../api/axiosConfig'
import './RecipeListPage.css'

function RecipeListPage() {
  const [recipeList, setRecipeList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchParams, setSearchParams] = useSearchParams()
  const location = useLocation()
  const navigate = useNavigate()

  // performance.navigation.type는 브라우저 제공 api임
  useEffect(() => {
    if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
      if (searchParams.get('keyword')) {
        navigate('/recipes', {replace: true})
        toast.success('목록이 초기화되었습니다.')
      }
    }
  }, []) // 빈 의존성 배열로 마운트 시에만 실행

  // 페이지 진입 시 검색어 동기화
  useEffect(() => {
    const keyword = searchParams.get('keyword') || ''
    setSearchTerm(keyword)
  }, [searchParams])

  useEffect(() => {
    const fetchRecipeList = async () => {
      setIsLoading(true)
      try {
        const keyword = searchParams.get('keyword') || ''
        const response = await api.get(`/recipes?keyword=${keyword}`)
        setRecipeList(response.data)
      } catch (error) {
        console.error('서버 오류', error)
        toast.error('레시피 목록을 불러오지 못했습니다.')
      } finally {
        setIsLoading(false)
      }
    }
    fetchRecipeList()
  }, [searchParams])

  const handleToSearch = e => {
    e.preventDefault()
    setSearchParams({keyword: searchTerm})
  }

  if (isLoading) return <p className="loading-message"> 화면을 불러오는 중입니다.</p>

  return (
    <div className="page-container">
      <form className="search-group" onSubmit={handleToSearch}>
        <input
          className="input-text"
          type="text"
          placeholder="검색어를 입력하세요"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <button type="submit" className="action-button button-primary">
          검색
        </button>
      </form>
      <div className="divider_bold"></div>

      {/* <h1>레시피 목록</h1> */}
      {recipeList.length > 0 ? (
        <div className="recipe-list-container">
          {/* 헤더 추가 */}
          <div className="recipe-list-header">
            <span className="header-title">레시피명</span>
            <span className="header-author">작성자</span>
          </div>
          <ul className="recipe-list">
            {recipeList.map(item => (
              <Link
                to={`/recipes/detail/${item._id}`}
                key={item._id}
                className="recipe-link">
                <li className="recipeitem">
                  <span className="recipe-title1">{item.title}</span>
                  <span className="recipe-author">
                    {item.creator?.username || '알수없음'}
                  </span>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      ) : (
        <div className="recipe-list-container">
          {/* 헤더 추가 */}
          <div className="recipe-list-header">
            <span className="header-title">레시피명</span>
            <span className="header-author">작성자</span>
          </div>
          <p className="loading-message">등록된 레시피가 없습니다.</p>
        </div>
      )}
    </div>
  )
}

export default RecipeListPage
