import './App.css'
import { Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Footer } from './components/Footer'
import { Blog } from './components/Blog'
import { Post } from './components/Post'
import { NewPost } from './components/newPost'
import { AuthProvider } from './context/AuthContext'
import { ErrorPage } from './components/Error'

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-white">
        <Navbar />

        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/nutricao-personalizada" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<Post />} />
          <Route path="/new-post" element={<NewPost />} />
          <Route path="*" element={<ErrorPage/>} />
        </Routes>
        <Footer />
      </div>
    </AuthProvider>
  )
}

export default App
