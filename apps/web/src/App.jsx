import './App.css'
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom'
import { useState, useEffect } from 'react'
import LogIn from './modules/forms/login/LogIn'
import Home from './modules/pages/home/Home'
import PostDetail from './modules/pages/post/PostDetail'
import Layout from './modules/pages/layout/Layout'
import Register from './modules/forms/register/Register'
import { jwtDecode } from 'jwt-decode'

function App() {
  const [isAuth, setIsAuth] = useState(false)
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  const [loadingAuth, setLoadingAuth] = useState(true)
  const [redirectTo, setRedirectTo] = useState(null)

  const baseUrl = import.meta.env.VITE_BASE_URL

  function PathTracker() {
    const location = useLocation()

    useEffect(() => {
      if (location.pathname !== '/login') {
        localStorage.setItem('lastVisitedPath', location.pathname)
      }
    }, [location])

    return null
  }

  useEffect(() => {
    const storedToken = localStorage.getItem('Bearer')
    if (storedToken) {
      setToken(storedToken)
    } else {
      setLoadingAuth(false)
    }
  }, [])

  useEffect(() => {
    if (token) {
      try {
        const decodedUser = jwtDecode(token)
        const isExpired = decodedUser.exp * 1000 < Date.now()
        if (isExpired) {
          logout()
          setLoadingAuth(false)
        } else {
          setUser(decodedUser)
          setIsAuth(true)
          setLoadingAuth(false)
        }
      } catch (err) {
        console.error('Invalid token:', err)
        logout()
        setLoadingAuth(false)
      }
    }
  }, [token])

  useEffect(() => {
    if (isAuth && !loadingAuth) {
      const lastPath = localStorage.getItem('lastVisitedPath') || '/'
      if (window.location.pathname === '/' && lastPath !== '/') {
        setRedirectTo(lastPath)
      }
    }
  }, [isAuth, loadingAuth])

  const logout = () => {
    localStorage.removeItem('Bearer')
    localStorage.removeItem('lastVisitedPath')
    setIsAuth(false)
    setUser(null)
    setToken(null)
  }

  const handleLogin = (newToken) => {
    localStorage.setItem('Bearer', newToken)
    setToken(newToken)
  }

  if (loadingAuth) {
    return (
      <div className="loaderContainer">
        <div className="loader"></div>
      </div>
    )
  }

  return (
    <BrowserRouter>
      <PathTracker />
      {redirectTo && <Navigate to={redirectTo} replace />}
      <Routes>
        <Route
          path="/"
          element={
            isAuth ? (
              <Layout user={user} logout={logout} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        >
          <Route
            index
            element={
              isAuth ? (
                <Home baseUrl={baseUrl} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="posts/:postId"
            element={
              isAuth ? (
                <PostDetail baseUrl={baseUrl} user={user} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Route>
        <Route
          path="/login"
          element={
            !isAuth ? (
              <LogIn onLoginSuccess={handleLogin} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/register"
          element={
            !isAuth ? (
              <Register onLoginSuccess={handleLogin} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
