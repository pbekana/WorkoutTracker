import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Dumbbell, LogOut, LayoutDashboard, Database, CalendarDays, Activity } from 'lucide-react';

const Sidebar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Routines', path: '/routines', icon: <CalendarDays size={20} /> },
    { name: 'Exercises', path: '/exercises', icon: <Database size={20} /> },
    { name: 'Logs', path: '/logs', icon: <Activity size={20} /> }
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen shadow-sm sticky top-0">
      <div className="p-6 border-b border-gray-100 flex items-center gap-3">
        <div className="bg-primary-500 text-white p-2 rounded-lg"><Dumbbell size={24} /></div>
        <span className="text-2xl font-black text-gray-800 tracking-tight">JEFIT</span>
      </div>
      
      <div className="flex-1 py-6 flex flex-col gap-2 px-4">
        {navItems.map(item => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <Link 
              key={item.name} 
              to={item.path} 
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold ${isActive ? 'bg-primary-50 text-primary-600' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
            >
              <div className={isActive ? 'text-primary-500' : 'text-gray-400'}>{item.icon}</div>
              {item.name}
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center gap-3 px-4 py-3 mb-2 rounded-xl bg-gray-50">
          <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold">
            {user?.username?.[0]?.toUpperCase() || 'U'}
          </div>
          <div className="text-sm font-bold text-gray-700 truncate">{user?.username}</div>
        </div>
        <button 
          onClick={handleLogout} 
          className="w-full flex items-center justify-center gap-2 px-4 py-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors font-medium text-sm"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
