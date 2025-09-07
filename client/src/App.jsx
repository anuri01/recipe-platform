import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
// import Header from './components/Header';
// import HomePage from './pages/HomePage';

function App() {
  return (
      <div>
        {/* <Header /> */}
        <main>
          <Routes>
            <Route path="/" element={<h1> 레피시 플랫폼 홈페이지</h1>} />
              {/* <Route path="/" element={<HomePage />} /> */}
              {/* (나중에 다른 페이지 라우트들을 추가합니다) */}
          </Routes>
        </main>
      </div>

  )
}

export default App
