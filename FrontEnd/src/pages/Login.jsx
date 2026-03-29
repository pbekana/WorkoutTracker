import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Dumbbell } from 'lucide-react';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to login');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 pb-10">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-primary-500 text-white p-3 rounded-xl mb-4 shadow-md">
            <Dumbbell size={36} />
          </div>
          <h2 className="text-3xl font-black mb-2 text-gray-900 tracking-tight">Log in to JEFIT</h2>
          <p className="text-gray-500 font-medium">Continue your fitness journey</p>
        </div>
        
        {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm font-medium text-center border border-red-100">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
            <input 
              type="email" 
              required
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all text-gray-900 font-medium"
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
            <input 
              type="password" 
              required
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all text-gray-900 font-medium"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="••••••••"
            />
          </div>
          <button type="submit" className="w-full bg-primary-500 hover:bg-primary-600 text-white py-3.5 rounded-xl font-bold text-lg transition-colors shadow-lg shadow-primary-500/25 mt-4">
            Log In
          </button>
        </form>
        <div className="mt-8 text-center text-gray-500 font-medium">
          New to Jefit? <Link to="/register" className="text-primary-600 hover:text-primary-700 font-bold ml-1">Sign up for free</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
