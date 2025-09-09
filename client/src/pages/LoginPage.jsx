import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import api from "../api/axiosConfig";
import toast from "react-hot-toast";

function LoginPage () {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async () => {
        if(!password || !username) {
            toast.error('로그인 정보를 입력하세요')
        }
            try {
                const response = await api.get('/users/login', { username, password });
                toast('로그인 되었습니다. 메인화면으로 이동합니다.');
                navigate('/');
            } catch(error) {
                toast.error(error?.response?.data?.message ? error.response.data.message : '로그인에 실패했습니다.');
            }
    }

    return (
        <div className="page-container">
             <div className="auth-header">
                <img src="images/large_logo.png" className="logo-image"></img>
                <h1> 아빠요리 로그인 </h1>
                <p>아이디와 패스워드를 입력하세요.</p>
            </div>

        </div>
    )

}

export default LoginPage;