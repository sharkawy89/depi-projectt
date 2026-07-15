import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { BookOpen, Settings, LogOut, LayoutDashboard, Users, UserCheck, GraduationCap, ChevronLeft, ChevronRight } from 'lucide-react';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { path: '/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { path: '/students', icon: <Users size={20} />, label: 'Students' },
    { path: '/teachers', icon: <GraduationCap size={20} />, label: 'Teachers' },
    { path: '/attendance', icon: <UserCheck size={20} />, label: 'Attendance' },
    { path: '/courses', icon: <BookOpen size={20} />, label: 'Courses' },
    { path: '/settings', icon: <Settings size={20} />, label: 'Settings' }
  ];

  return (
    <aside 
      className={`relative flex flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300 ${isCollapsed ? 'w-20 px-3' : 'w-64 px-4'} py-6 h-full flex-shrink-0 z-20`}
    >
      {/* Toggle Button */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full w-6 h-6 flex items-center justify-center cursor-pointer z-50 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white shadow-sm"
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* Logo */}
      <div className={`flex items-center mb-8 ${isCollapsed ? 'justify-center' : 'gap-3 px-2'}`}>
        <div className="w-8 h-8 rounded bg-blue-900 dark:bg-blue-800 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
          DE
        </div>
        {!isCollapsed && (
          <h2 className="text-base font-bold text-gray-900 dark:text-white whitespace-nowrap overflow-hidden m-0">DEPI SMS</h2>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            title={isCollapsed ? item.label : ""}
            className={({ isActive }) => `
              flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
              ${isCollapsed ? 'justify-center' : 'justify-start'}
              ${isActive ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'}
            `}
          >
            <div className="flex items-center justify-center w-5">
              {item.icon}
            </div>
            {!isCollapsed && <span className="whitespace-nowrap">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Logout Footer */}
      <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-800">
        <a 
          href="/#/login" 
          title={isCollapsed ? "Logout" : ""}
          className={`
            flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-gray-500 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400
            ${isCollapsed ? 'justify-center' : 'justify-start'}
          `}
        >
          <div className="flex items-center justify-center w-5">
            <LogOut size={20} />
          </div>
          {!isCollapsed && <span className="whitespace-nowrap">Logout</span>}
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;
