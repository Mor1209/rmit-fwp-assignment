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
import AllPosts from './pages/posts/AllPosts'
import CreatePost from './pages/posts/CreatePost'
import Post from './pages/posts/Post'
import EditPost from './pages/posts/EditPost'
import { QueryClient, QueryClientProvider } from 'react-query'
const queryClient = new QueryClient()

function App() {
  const { isAuth } = useAuthContext()
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<LandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {isAuth && <Route path="/posts" element={<AllPosts />} />}
          {isAuth && <Route path="/posts/new" element={<CreatePost />} />}
          {isAuth && <Route path="/post/:id" element={<Post />} />}
          {isAuth && <Route path="/posts/edit/:id" element={<EditPost />} />}
          {isAuth ? (
            <Route path="/profile" element={<Profile />} />
          ) : (
            <Route path="/profile" element={<Navigate to="/login" />} />
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </QueryClientProvider>
  )
}

export default App
