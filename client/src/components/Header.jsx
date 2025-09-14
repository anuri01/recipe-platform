import React from 'react'
import {useLocation, Link} from 'react-router-dom'
import MainHeader from './MainHeader'
import SubHeader from './SubHeader'

// 모든 페이지 설정을 한 곳에서 관리
const PAGE_CONFIG = {
  '/signup': {title: '회원가입', showMenu: false},
  '/login': {title: '로그인', showMenu: false},
  '/recipes/editor': {title: '레시피 등록', showMenu: false},
  '/recipes': {title: '레시피 목록', showMenu: true}
  // 새로운 설정 추가가 쉬움
  // '/profile': { title: '프로필', showMenu: true, showBack: false },
}

function Header() {
  const location = useLocation()

  const getPageConfig = pathname => {
    // 정확한 경로 매칭 객체 키에 /가 있을 경우는 . 로 접근하지 않고 [] 로 접근함.
    if (PAGE_CONFIG[pathname]) {
      return PAGE_CONFIG[pathname]
    }

    // 동적 경로 처리
    if (pathname.startsWith('/recipes/detail')) {
      return {title: '레시피 상세', showMenu: true}
    }

    return {title: '', showMenu: true}
  }

  const isHomePage = location.pathname === '/'
  const {title, showMenu} = getPageConfig(location.pathname)

  return isHomePage ? <MainHeader /> : <SubHeader title={title} showMenu={showMenu} />
}

export default Header
