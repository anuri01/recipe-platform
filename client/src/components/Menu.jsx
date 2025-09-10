import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useLayerStore from "../store/layerStore";
import useUserStore from "../store/userStore";
import './Menu.css';

function Menu() {

const { closeLayer, isLayerOpen } = useLayerStore();
const { isLoggedIn, logout, user } = useUserStore();

useEffect(() => {
    if(isLayerOpen) {
        document.body.classList.add('scroll-rock')
    } else {
        document.body.classList.remove('scroll-rock')
    }
    return () => {
        document.body.classList.remove('scroll-rock')
    }

},[isLayerOpen, closeLayer])

const handleLogout = () => {
    logout();
    closeLayer();
}
return (
    <>
    <div className={`menu-overlay ${isLayerOpen ? 'open' : ''}`} onClick={closeLayer} />
    <div className={`menu-container ${isLayerOpen ? 'open' : ''}`}>
        <div className="menu-header">
            <div className="util-group">
            { isLoggedIn ? (
                <>
                <h2><Link to='/profile' onClick={closeLayer} className="auth-link">{user.username}</Link> 님 안녕하세요!</h2>
                <button
                onClick={handleLogout} 
                className="auth-link, button-secondary">로그아웃</button>
                </>
                
            ) : (
                <>
                <h2><Link to='/login' onClick={closeLayer} className="auth-link">로그인</Link> 하세요.</h2>
                <p>계정이 없다면? <Link to='/signup' onClick={closeLayer} className="auth-link">회원가입</Link></p>
                </>
            )}
            </div>
            
                <button onClick={closeLayer} className={`close-btn ${!isLoggedIn ? 'position' : ''}`}>&times;</button>
            
        </div>
            <nav className="menu-nav">
                <ul>
                    <li><Link to='/recipes' onClick={closeLayer}>레시피 보기</Link></li>
                    <li><Link to='/recipes/editor' onClick={closeLayer}>레시피 등록</Link></li>
                </ul>
            </nav>

    </div>
    </>
    
)

}

export default Menu;