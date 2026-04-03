import React, { useState, useContext } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { UrbanContext } from '../context/urbanContext';
import { Menu, X, Plus, User, LogOut, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { token, logout } = useContext(UrbanContext);
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Feed', path: '/problems' },
    { name: 'My Reports', path: '/myproblem' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
              <span className="text-white font-bold text-xl">U</span>
            </div>
            <Link to="/" className="text-xl font-extrabold tracking-tight text-slate-900 uppercase">
              Urban<span className="text-blue-600">Voice</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {navLinks.map((link) => (
                <NavLink 
                  key={link.name} 
                  to={link.path} 
                  className={({ isActive }) => `text-sm font-semibold transition-all duration-300 hover:text-blue-600 ${isActive ? 'text-blue-600' : 'text-slate-500'}`}
                >
                  {link.name}
                </NavLink>
              ))}
            </div>

            <div className="h-6 w-[1px] bg-slate-200"></div>

            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate('/create')}
                className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-blue-600 hover:shadow-xl hover:shadow-blue-100 transition-all active:scale-95"
              >
                <Plus size={18} />
                Report
              </button>

              {!token ? (
                <button 
                  onClick={() => navigate('/login')}
                  className="text-sm font-bold text-slate-900 hover:text-blue-600 transition-colors"
                >
                  Sign In
                </button>
              ) : (
                <div className="relative group cursor-pointer">
                  <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center border border-slate-200 group-hover:border-blue-300 transition-all">
                    <User size={20} className="text-slate-600" />
                  </div>
                  
                  {/* Dropdown Menu */}
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-100 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 overflow-hidden">
                    <button 
                      onClick={() => { logout(); navigate('/login'); }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors"
                    >
                      <LogOut size={16} />
                      Log out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Mobile Toggle */}
          <button className="md:hidden p-2 text-slate-600" onClick={() => setShowMobileMenu(!showMobileMenu)}>
            {showMobileMenu ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute w-full bg-white border-b border-slate-100 transition-all duration-300 ease-in-out ${showMobileMenu ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="px-6 py-8 space-y-4">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              onClick={() => setShowMobileMenu(false)}
              className="block text-lg font-bold text-slate-800"
            >
              {link.name}
            </Link>
          ))}
          <button 
            onClick={() => { navigate('/create'); setShowMobileMenu(false); }}
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-100"
          >
            Report a Problem
          </button>
          {!token && (
            <button 
              onClick={() => { navigate('/login'); setShowMobileMenu(false); }}
              className="w-full text-slate-900 font-bold py-2"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;