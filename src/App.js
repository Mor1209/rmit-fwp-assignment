import './App.css'
// import Header from './components/Layout/Header'
import Register from './pages/Register'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import { Routes, Route, Navigate } from 'react-router-dom'
import Profile from './pages/Profile'
import { useAuthContext } from './hooks/useAuthContext'
import LandingPage from './pages/LandingPage'
import Layout from './components/Layout/Layout'

function App() {
  const { isAuth } = useAuthContext()
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {isAuth ? (
          <Route path="/profile" element={<Profile />} />
        ) : (
          <Route path="/profile" element={<Navigate to="/login" />} />
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  )
}

export default App
