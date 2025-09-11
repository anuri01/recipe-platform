import React from "react";
import { useLocation, Link } from "react-router-dom";
import MainHeader from "./MainHeader";
import SubHeader from "./SubHeader";

function Header() {
    const location = useLocation();

    // 페이지 경로에 따라 동적으로 제목을 할당하는 함수
    const getPageTitle = (pathname) => {
        if(pathname.startsWith('/signup')) return '회원가입';
        if(pathname.startsWith('/recipes/editor')) return '레시피 등록';
        if(pathname === '/recipes') return '레시피 목록';
        if(pathname.startsWith('/recipes/detail')) return '레시피 상세';
        if(pathname === '/login') return '로그인';
        // 추후 경로 추가

        return '';
    }
    
    const isHomePage = location.pathname === '/';
    const title = getPageTitle(location.pathname);

    return (
        isHomePage ? <MainHeader /> : <SubHeader title={title}/>
    )
}

export default Header;