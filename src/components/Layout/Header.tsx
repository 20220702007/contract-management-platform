import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

export const Header: React.FC = () => {
  const currentUser = useAuthStore((state) => state.currentUser);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 shadow-lg border-b border-indigo-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg group-hover:bg-white/30 transition-all">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <div className="text-2xl font-bold text-white tracking-tight">
                ContractHub
              </div>
              <div className="text-xs text-indigo-200 font-medium">
                Professional Contract Management
              </div>
            </div>
          </Link>
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex gap-1">
              <Link
                to="/"
                className="text-white/90 hover:text-white hover:bg-white/20 px-4 py-2 rounded-lg text-sm font-medium transition-all"
              >
                Dashboard
              </Link>
              <Link
                to="/blueprints"
                className="text-white/90 hover:text-white hover:bg-white/20 px-4 py-2 rounded-lg text-sm font-medium transition-all"
              >
                Blueprints
              </Link>
              <Link
                to="/field-library"
                className="text-white/90 hover:text-white hover:bg-white/20 px-4 py-2 rounded-lg text-sm font-medium transition-all"
              >
                Field Library
              </Link>
            </nav>
            {currentUser && (
              <div className="flex items-center gap-4 pl-4 border-l border-white/20">
                <div className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <span className="text-sm text-white">
                    <span className="font-semibold">{currentUser.username}</span>
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-white/90 hover:text-white hover:bg-red-500/30 px-4 py-2 rounded-lg text-sm font-medium transition-all"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
