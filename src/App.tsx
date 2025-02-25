import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { AuthProvider } from "./context/AuthContext";
import { ErrorMessage } from "./components/ErrorMessage";
import { ProtectedRoute } from "./components/ProtectedRoute";

import { NewPost } from "./pages/newPost";
import { Hero } from "./pages/Hero";
import { About } from "./pages/About";
import { Blog } from "./pages/Blog";
import { Post } from "./pages/Post";
import { AdminPanel } from "./pages/AdminPanel";
import { CreatePostPage } from "./pages/CreatePostPage";

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
          
          <Route element={<ProtectedRoute adminOnly />}>
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/admin/new" element={<CreatePostPage />} />
            <Route path="/admin/edit/:id" element={<CreatePostPage />} />
          </Route>

          <Route path="*" element={<ErrorMessage />} />
        </Routes>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
