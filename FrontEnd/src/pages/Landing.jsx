import React from 'react';
import { Link } from 'react-router-dom';
import { Dumbbell, Activity, CalendarDays, Database } from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="bg-primary-500 text-white p-2 rounded-lg"><Dumbbell size={28} /></div>
          <span className="text-3xl font-black text-gray-800 tracking-tight">JEFIT</span>
        </div>
        <div className="flex gap-4 font-semibold">
          <Link to="/login" className="px-6 py-2 text-gray-600 hover:text-primary-600 transition">Log In</Link>
          <Link to="/register" className="px-6 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition shadow-md">Sign Up Free</Link>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gray-50 py-20 px-4 border-b border-gray-100">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-6xl font-black text-gray-900 leading-tight">Your Ultimate Workout Planner & Tracker</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Create personalized workout routines, log your fitness journey, and optimize training with data-driven analytics.</p>
          <div className="pt-4">
            <Link to="/register" className="px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white text-lg font-bold rounded-xl shadow-xl shadow-primary-500/30 transition transform hover:-translate-y-1 inline-block">
              Start Tracking Now
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm"><Database size={32} /></div>
            <h3 className="text-2xl font-bold text-gray-800">Massive Exercise Database</h3>
            <p className="text-gray-600 leading-relaxed">Access hundreds of exercises with detailed instructions, muscles targeted, and equipment needed.</p>
          </div>
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm"><CalendarDays size={32} /></div>
            <h3 className="text-2xl font-bold text-gray-800">Custom HD Routines</h3>
            <p className="text-gray-600 leading-relaxed">Build multi-day workout splits tailored exactly to your goals, or browse our community favorites.</p>
          </div>
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm"><Activity size={32} /></div>
            <h3 className="text-2xl font-bold text-gray-800">Advanced Analytics</h3>
            <p className="text-gray-600 leading-relaxed">Track your 1RM, volume, and workout streaks directly from your dashboard to ensure consistent progressive overload.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
