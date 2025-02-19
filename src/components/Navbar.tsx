import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? 'text-primary' : 'text-secondary';
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/">
              <img src={logo} alt="Renata Lazarino" className="h-12 w-auto" />
            </Link>
          </div>
          
          <div className="hidden sm:flex sm:space-x-8 items-center">
            <Link to="/" className={`${isActive('/')} hover:text-primary-dark px-3 py-2 text-sm font-medium transition-colors`}>
              Home
            </Link>
            <Link to="/nutricao-personalizada" className={`${isActive('/nutricao-personalizada')} hover:text-primary-dark px-3 py-2 text-sm font-medium transition-colors`}>
              Sobre
            </Link>
            <a 
              href="https://wa.me/5531971630379?text=Olá%0AQuero%20iniciar%20minha%20jornada%20para%20uma%20vida%20mais%20saudável!" target="_blank"
              className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-full text-sm font-medium">
              Fale Comigo
            </a>
          </div>

          <div className="sm:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-secondary">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link to="/" className="block px-3 py-2 text-base font-medium text-secondary hover:bg-gray-50">
              Home
            </Link>
            <Link to="/nutricao-personalizada" className="block px-3 py-2 text-base font-medium text-secondary hover:bg-gray-50">
              Sobre
            </Link>
            <a href="https://wa.me/5531971630379?text=Olá%0AQuero%20iniciar%20minha%20jornada%20para%20uma%20vida%20mais%20saudável!" target="_blank"
              className="block px-3 py-2 text-base font-medium text-primary hover:bg-gray-50">
              Fale Comigo
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};