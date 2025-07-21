import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import LogIn from './modules/forms/login/LogIn'
import Home from './modules/pages/home/Home'
import PostDetail from './modules/pages/post/PostDetail'
import Layout from './modules/pages/layout/Layout'

function App() {
  const [isAuth, setIsAuth] = useState(false)
  const baseUrl = import.meta.env.VITE_BASE_URL

  useEffect(() => {
    const token = localStorage.getItem('Bearer')
    if (token) {
      setIsAuth(true)
    }
  }, [])

  const handleLogin = () => {
    setIsAuth(true)
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={isAuth ? <Layout /> : <Navigate to="/login" />}
        >
          <Route index element={isAuth ? <Home baseUrl={baseUrl}/> : <Navigate to="/login" />} />
          <Route
            path="posts/:postId"
            element={<PostDetail baseUrl={baseUrl} />}
          />
        </Route>
        <Route
          path="/login"
          element={
            !isAuth ? (
              <LogIn onLoginSuccess={handleLogin} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
