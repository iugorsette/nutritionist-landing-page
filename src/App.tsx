import './App.css'
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
    <Navbar />
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="/about" element={<About />} />
    </Routes>
    <Footer />
  </div>
  )
}

export default App
