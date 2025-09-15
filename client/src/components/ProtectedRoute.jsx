import React from 'react';
import {Navigate} from 'react-router-dom';
import useUserStore from '../store/userStore';

// 로그인 체크 후 표기한 페이지를 props로 전달
function ProtectedRoute({children}) {
  const {isLoggedIn} = useUserStore();
  // 로그인 여부 체크후 랜더링할 페이지 전달 또는 로그인 페이지로 이동
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
