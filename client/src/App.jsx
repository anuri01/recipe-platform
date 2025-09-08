import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import { Toaster } from 'react-hot-toast';
import HomePage from './pages/HomePage';
import Header from './components/Header';
// import HomePage from './pages/HomePage';

function App() {
  return (
      <div className='app-container'>
        <Toaster 
          position='top-center'
          toastOptions={
            { duration: 1000 }
            } />
        <Header />
        <main className='app-main'>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignupPage />}/>
              {/* <Route path="/" element={<HomePage />} /> */}
              {/* (나중에 다른 페이지 라우트들을 추가합니다) */}
          </Routes>
        </main>
      </div>

  )
}

export default App
