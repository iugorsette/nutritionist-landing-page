import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaGoogle, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa"; 
import logo from "../assets/logo.png";
import { useAuth } from "../context/AuthContext";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const { user, signInWithGoogle, logout } = useAuth();

  const isActive = (path: string) => (location.pathname === path ? "text-primary" : "text-secondary");

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/">
            <img src={logo} alt="Renata Lazarino" className="h-12 w-auto" />
          </Link>

          {/* Links Desktop */}
          <div className="hidden sm:flex sm:space-x-8 items-center">
            <Link to="/" className={`${isActive("/")} hover:text-primary-dark px-3 py-2 text-sm font-medium transition-colors`}>
              Home
            </Link>
            <Link to="/nutricao-personalizada" className={`${isActive("/nutricao-personalizada")} hover:text-primary-dark px-3 py-2 text-sm font-medium transition-colors`}>
              Sobre
            </Link>
            <Link to="/blog" className={`${isActive("/blog")} hover:text-primary-dark px-3 py-2 text-sm font-medium transition-colors`}>
              Blog
            </Link>
            {/* <a
              href="https://wa.me/5531971630379?text=Olá%0AQuero%20iniciar%20minha%20jornada%20para%20uma%20vida%20mais%20saudável!"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-full text-sm font-medium"
            >
              Fale Comigo
            </a> */}

            {/* Botão de Login/Logout */}
            <div className="flex items-center">
              {user ? (
                <div className="flex items-center gap-4">
                  {user.photoURL && (
                    <img src={user.photoURL} alt="Foto do usuário" className="w-10 h-10 rounded-full border" />
                  )}
                  <button
                    onClick={logout}
                    className="flex items-center gap-2 bg-primary-alert hover:bg-red-600 text-white px-4 py-2 rounded-full transition"
                  >
                    <FaSignOutAlt /> Sair
                  </button>
                </div>
              ) : (
                <button
                  onClick={signInWithGoogle}
                  className="flex items-center gap-2 bg-primary-ok hover:bg-blue-600 text-white px-4 py-2 rounded-full transition"
                >
                  <FaGoogle /> Entrar com Google
                </button>
              )}
            </div>
          </div>

          {/* Menu Mobile */}
          <div className="sm:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-secondary">
              {isOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link to="/" className="block px-3 py-2 text-base font-medium text-secondary hover:bg-gray-50">
              Home
            </Link>
            <Link to="/nutricao-personalizada" className="block px-3 py-2 text-base font-medium text-secondary hover:bg-gray-50">
              Sobre
            </Link>
            <Link to="/blog" className="block px-3 py-2 text-base font-medium text-secondary hover:bg-gray-50">
              Blog
            </Link>
        

            {/* Mobile Login/Logout */}
            <div className="mt-4">
              {user ? (
                <div className="flex flex-col items-center gap-3">
                  {user.photoURL && <img src={user.photoURL} alt="Foto do usuário" className="w-12 h-12 rounded-full border" />}
                  <button
                    onClick={logout}
                    className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full transition"
                  >
                    <FaSignOutAlt /> Sair
                  </button>
                </div>
              ) : (
                <button
                  onClick={signInWithGoogle}
                  className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition w-full"
                >
                  <FaGoogle /> Entrar com Google
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
