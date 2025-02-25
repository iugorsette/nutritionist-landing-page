import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaGoogle, FaSignOutAlt, FaBars, FaTimes, FaMoon, FaSun } from "react-icons/fa";
import logo from "../assets/logo.png";
import { useAuth } from "../context/AuthContext";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");
  const location = useLocation();

  const { user, role, signInWithGoogle, logout } = useAuth();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const isActive = (path: string) => (location.pathname === path ? "text-primary dark:text-gray-300" : "text-secondary dark:text-gray-400");

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm dark:shadow-md">
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
            {role === "admin" && (
              <Link to="/admin" className={`${isActive("/admin")} hover:text-primary-dark px-3 py-2 text-sm font-medium transition-colors`}>
                Painel de Admin
              </Link>
            )}

            {/* Botão de Dark Mode */}
            <button onClick={toggleDarkMode} className="text-secondary dark:text-gray-300 hover:text-primary dark:hover:text-yellow-400 transition">
              {darkMode ? <FaSun className="w-6 h-6" /> : <FaMoon className="w-6 h-6" />}
            </button>

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
            <button onClick={() => setIsOpen(!isOpen)} className="text-secondary dark:text-gray-300">
              {isOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="sm:hidden bg-white dark:bg-gray-800">
          <div className="pt-2 pb-3 space-y-1">
            <Link to="/" className="block px-3 py-2 text-base font-medium text-secondary dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
              Home
            </Link>
            <Link to="/nutricao-personalizada" className="block px-3 py-2 text-base font-medium text-secondary dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
              Sobre
            </Link>
            <Link to="/blog" className="block px-3 py-2 text-base font-medium text-secondary dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
              Blog
            </Link>

            {/* Botão de Dark Mode (Mobile) */}
            <button onClick={toggleDarkMode} className="w-full flex justify-center py-2 text-secondary dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
              {darkMode ? <FaSun className="w-6 h-6" /> : <FaMoon className="w-6 h-6" />}
            </button>

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
