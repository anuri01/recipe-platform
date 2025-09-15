import {useState} from 'react';
import {Routes, Route} from 'react-router-dom';
import {Toaster} from 'react-hot-toast';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import SignupGate from './pages/SignupGate';
import RecipeListPage from './pages/RecipeListPage';
import RecipeEditor from './pages/RecipeEditor';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import RecipeDetailPage from './pages/RecipeDetailPage';
import BottomNav from './components/BottomNav';

function App() {
  return (
    <div className="app-container">
      <Toaster position="top-center" toastOptions={{duration: 1000}} />
      <Header />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/recipes" element={<RecipeListPage />} />
          <Route
            path="/recipes/editor"
            element={
              <ProtectedRoute>
                <RecipeEditor />
              </ProtectedRoute>
            }
          />
          <Route path="/recipes/detail/:recipeId" element={<RecipeDetailPage />} />
          <Route path="/signup/form" element={<SignupPage />} />
          <Route path="/signup" element={<SignupGate />} />
          <Route path="/login" element={<LoginPage />} />
          {/* <Route path="/" element={<HomePage />} /> */}
          {/* (나중에 다른 페이지 라우트들을 추가합니다) */}
        </Routes>
      </main>
      <BottomNav />
    </div>
  );
}

export default App;
