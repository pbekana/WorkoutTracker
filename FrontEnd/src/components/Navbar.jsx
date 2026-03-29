import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Dumbbell, LogOut } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-neutral-800 shadow-lg border-b border-neutral-700">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 text-primary-500 hover:text-primary-400 transition-colors">
          <Dumbbell size={28} />
          <span className="text-xl font-bold tracking-wider">FITTRACK</span>
        </Link>
        <div className="flex items-center space-x-6">
          {user ? (
            <>
              <Link to="/" className="text-neutral-300 hover:text-white transition-colors font-medium">Dashboard</Link>
              <Link to="/workout" className="bg-primary-600 hover:bg-primary-500 text-white px-4 py-2 rounded-lg transition-colors shadow font-medium">
                + New Workout
              </Link>
              <button onClick={handleLogout} className="text-neutral-400 hover:text-red-400 flex items-center space-x-1 transition-colors font-medium">
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-neutral-300 hover:text-white transition-colors font-medium">Login</Link>
              <Link to="/register" className="bg-primary-600 hover:bg-primary-500 text-white px-4 py-2 rounded-lg transition-colors font-medium shadow">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
