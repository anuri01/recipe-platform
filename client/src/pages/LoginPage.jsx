import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/axiosConfig'
import toast from 'react-hot-toast'
import useUserStore from '../store/userStore'
import './Auth.css'

function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const { setToken } = useUserStore()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!password || !username) {
      toast.error('로그인 정보를 입력하세요')
      return
    }
    try {
      const response = await api.post('/users/login', { username, password })
      const name = response.data.user.name
      const token = response.data.token
      setToken(token)
      toast(name + '님 환영합니다.')
      navigate('/')
    } catch (error) {
      toast.error(
        error?.response?.data.message
          ? error.response.data.message
          : '로그인에 실패했습니다.'
      )
    }
  }

  return (
    <div className="page-container">
      <div className="auth-header">
        <img src="images/large_logo.png" className="logo-image"></img>
        <h1> 아빠요리 로그인 </h1>
        <p>아이디와 패스워드를 입력하세요.</p>
      </div>
      <form className="form-section" onSubmit={handleSubmit}>
        <input
          className="input-text"
          type="text"
          placeholder="아이디를 입력하세요"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          maxLength="20"
        />
        <input
          className="input-text"
          type="password"
          placeholder="비밀번호를 입력하세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          maxLength="20"
        />
        <div className="cta-group">
          <button type="submit" className="button button-primary">
            로그인
          </button>
        </div>
      </form>
      <div className="social-section">
        <div className="divider">
          <span>또는</span>
        </div>
        {/* 나중에 여기에 소셜 로그인 버튼들이 추가될 예정입니다. */}
        <p style={{ textAlign: 'center', color: '#888' }}>
          소셜 로그인 준비 중
        </p>
      </div>

      <p className="auth-link-text">
        아직 회원이 아니신가요? <Link to="/signup">가입하기</Link>
      </p>
    </div>
  )
}

export default LoginPage
