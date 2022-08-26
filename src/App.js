import './App.css'
// import Header from './components/Layout/Header'
import Register from './pages/Register'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import { Routes, Route, Navigate } from 'react-router-dom'
import Profile from './pages/Profile'
import { useAuthContext } from './hooks/useAuthContext'
import LandingPage from './pages/LandingPage'
import Navbar from './components/Layout/Navbar'
import Notification from './components/UI/Notification'
import Footer from './components/Layout/Footer'
import AllPosts from './pages/posts/AllPosts'
import CreatePost from './pages/posts/CreatePost'
import UserPosts from './pages/posts/UserPosts'
import Post from './pages/posts/Post'
import EditPost from './pages/posts/EditPost'

function App() {
  const { isAuth } = useAuthContext()
  return (
    <div className="App">
      {/* <Header /> */}
      <Navbar />
      <Notification />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/posts" element={<AllPosts />} />
        <Route path="/posts/new" element={<CreatePost />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/posts/edit/:id" element={<EditPost />} />
        <Route path="/posts/:user" element={<UserPosts />} />
        {isAuth ? (
          <Route path="/profile" element={<Profile />} />
        ) : (
          <Route path="/profile" element={<Navigate to="/login" />} />
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
