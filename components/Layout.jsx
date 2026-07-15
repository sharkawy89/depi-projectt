import React, { useState, useRef, useEffect } from 'react';
import { Navigate, Outlet, Link, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useGlobalContext } from '../context/GlobalContext';
import { Sun, Moon, Menu, X } from 'lucide-react';

const Layout = ({ isAuthenticated }) => {
  const { theme, setTheme, profileImage } = useGlobalContext();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const toggleTheme = () => {
    const currentTheme = theme === 'system' 
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : theme;
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  };

  const location = useLocation();
  const currentPath = location.pathname.split('/')[1] || 'dashboard';

  // Close mobile sidebar on route change
  useEffect(() => {
    setIsMobileSidebarOpen(false);
  }, [location.pathname]);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-50 dark:bg-gray-900 font-sans transition-colors duration-200">
      
      {/* Desktop Sidebar */}
      <div className="hidden lg:block sticky top-0 h-screen flex-shrink-0 z-[60]">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-[70] flex lg:hidden">
          <div 
            className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm"
            onClick={() => setIsMobileSidebarOpen(false)}
          ></div>
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white dark:bg-gray-900 shadow-xl z-50">
            <Sidebar />
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0 w-full">
        {/* Top Header */}
        <header className="sticky top-0 z-50 h-16 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex items-center justify-between px-4 lg:px-8 flex-shrink-0 transition-colors duration-200">
          <div className="flex items-center gap-3 lg:gap-4 text-sm text-gray-500 dark:text-gray-400">
            <button 
              className="lg:hidden p-2 -ml-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
              onClick={() => setIsMobileSidebarOpen(true)}
            >
              <Menu size={20} className="text-gray-900 dark:text-white" />
            </button>
            <span className="hidden sm:inline">Admin Portal</span>
            <span className="hidden sm:inline">/</span>
            <span className="text-gray-900 dark:text-white font-medium capitalize">{currentPath}</span>
          </div>
          
          <div className="flex items-center gap-3 relative">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              title="Toggle theme"
              className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700"
            >
              {(theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) 
                ? <Sun size={18} /> 
                : <Moon size={18} />
              }
            </button>

            {/* Profile Dropdown Wrapper */}
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-700 dark:text-blue-400 font-medium text-sm border border-blue-200 dark:border-blue-800 cursor-pointer hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 overflow-hidden"
              >
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  "AD"
                )}
              </button>
              
              {/* Dropdown Menu */}
              <div 
                className={`absolute right-0 top-full mt-2 w-56 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow-lg py-2 z-50 overflow-hidden origin-top-right transition-all duration-200 ease-out ${isDropdownOpen ? 'transform scale-100 opacity-100 visible pointer-events-auto' : 'transform scale-95 opacity-0 invisible pointer-events-none'}`}
              >
                <Link onClick={() => setIsDropdownOpen(false)} to="/profile" className="block px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">My Profile</Link>
                <Link onClick={() => setIsDropdownOpen(false)} to="/settings" className="block px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">Account Settings</Link>
                <div className="border-t border-gray-100 dark:border-gray-700 my-1.5"></div>
                <a href="/#/login" className="block px-4 py-2.5 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">Log out</a>
              </div>
            </div>
          </div>
        </header>
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
