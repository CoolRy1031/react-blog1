import './App.css'
import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Profiles from './pages/Profiles/Profiles'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import * as authService from './services/authService'
import AddPost from './pages/AddPost/AddPost'
import * as postService from './services/postService'
import PostList from './pages/PostList/PostList'

const App = () => {
  const [user, setUser] = useState(authService.getUser())
  const [posts, setPosts] = useState([])
  const navigate = useNavigate()

  const handleLogout = () => {
    authService.logout()
    setUser(null)
    navigate('/')
  }


  useEffect(() => {
    const fetchAllPosts = async () => {
      const postData = await postService.getAll()
      setPosts(postData)
    }
    fetchAllPosts()
  }, [])

  const handleSignupOrLogin = () => {
    setUser(authService.getUser())
  }

  const handleAddPost = async postData => {
    const newPost = await postService.create(postData)
    setPosts([...posts, newPost])
    navigate('/')
  }
  const handleDeletePost = async postId => {
    const deletedPost = await postService.deletePost(postId)
    const newPostArray = posts.filter(post => post._id !== deletedPost._id)
    setPosts(newPostArray)
    navigate('/')
  }

  return (
    <>
    <div className='App'>
      <NavBar user={user} handleLogout={handleLogout} />
    <main>
      <Routes>
      <Route path="/new" element={<AddPost 
        handleAddPost= {handleAddPost}/>} />
        <Route />
        <Route path="/" element={<PostList handleDeletePost={handleDeletePost} user={user} posts={posts} />} />
        <Route
          path="/signup"
          element={<Signup handleSignupOrLogin={handleSignupOrLogin} />}
        />
        <Route
          path="/login"
          element={<Login handleSignupOrLogin={handleSignupOrLogin} />}
        />
        <Route
          path="/profiles"
          element={user ? <Profiles /> : <Navigate to="/login" />}
        />
        <Route
          path="/changePassword"
          element={
            user ? (
              <ChangePassword handleSignupOrLogin={handleSignupOrLogin} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </main>
    </div>
    </>
  )
}

export default App
