import React from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import './Auth.css'; // 공통 스타일 재사용

function SignupGate() {
    
    const handleSocialSignupClick = () => {
        toast('소셜 가입 기능은 현재 준비 중입니다.');
    };

    return (
        <div className="page-container">
            <div className="auth-header">
                <img src="/images/large_logo.png" className="logo-image" alt="로고" />
                <h1>아빠요리에 오신 것을 환영합니다!</h1>
                <p>가입 방식을 선택해주세요.</p>
            </div>
            
            <div className="cta-group">
                <Link to="/signup/form" className="button button-primary">
                    일반 가입하기
                </Link>
                <button onClick={handleSocialSignupClick} className="button button-secondary">
                    소셜로 시작하기
                </button>
            </div>

            <p className="auth-link-text">
                이미 계정이 있으신가요? <Link to="/login">로그인</Link>
            </p>
        </div>
    );
}

export default SignupGate;