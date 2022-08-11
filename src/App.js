import './App.css'
import Header from './components/Layout/Header'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import { Routes, Route, Navigate } from 'react-router-dom'
import Profile from './pages/Profile'
import { useAuthContext } from './hooks/useAuthContext'

function App() {
  const { isAuth } = useAuthContext()
  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {isAuth ? (
            <Route path="/profile" element={<Profile />} />
          ) : (
            <Route path="/profile" element={<Navigate to="/login" />} />
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
