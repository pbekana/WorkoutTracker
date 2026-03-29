import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import { Calendar, Clock, Weight, Flame, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [workouts, setWorkouts] = useState([]);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [workoutsRes, reportsRes] = await Promise.all([
          api.get('/workouts'),
          api.get('/reports/progress')
        ]);
        setWorkouts(workoutsRes.data);
        setReports(reportsRes.data);
      } catch (err) {
        console.error('Failed to fetch data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="text-center py-20 text-gray-400 font-medium">Loading your fitness data...</div>;

  const totalWorkouts = workouts.length;
  const totalVolume = reports.reduce((sum, r) => sum + r.totalWeightLifted, 0);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:justify-between items-start md:items-end gap-4 border-b border-gray-200 pb-6">
        <div>
          <h1 className="text-4xl font-black text-gray-900 mb-1 tracking-tight">Welcome back, {user?.username}!</h1>
          <p className="text-gray-500 font-medium text-lg">Here is your training progress overview.</p>
        </div>
        <Link to="/logs" className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-primary-500/20 transition-all inline-block">
          Start New Workout
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div className="flex items-center space-x-3 mb-2">
            <div className="bg-primary-50 p-2 rounded-lg text-primary-600"><Calendar size={20} /></div>
            <h3 className="text-gray-500 font-bold text-sm uppercase tracking-wider">Total Sessions</h3>
          </div>
          <p className="text-4xl font-black text-gray-900 mt-2">{totalWorkouts}</p>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div className="flex items-center space-x-3 mb-2">
            <div className="bg-indigo-50 p-2 rounded-lg text-indigo-600"><Weight size={20} /></div>
            <h3 className="text-gray-500 font-bold text-sm uppercase tracking-wider">Volume Lifted</h3>
          </div>
          <p className="text-4xl font-black text-gray-900 mt-2">{totalVolume.toLocaleString()} lbs</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div className="flex items-center space-x-3 mb-2">
            <div className="bg-orange-50 p-2 rounded-lg text-orange-600"><Clock size={20} /></div>
            <h3 className="text-gray-500 font-bold text-sm uppercase tracking-wider">Last Workout</h3>
          </div>
          <p className="text-2xl font-black text-gray-900 mt-2">
            {workouts.length > 0 ? new Date(workouts[0].date).toLocaleDateString() : 'N/A'}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div className="flex items-center space-x-3 mb-2">
            <div className="bg-red-50 p-2 rounded-lg text-red-600"><Flame size={20} /></div>
            <h3 className="text-gray-500 font-bold text-sm uppercase tracking-wider">Active Streak</h3>
          </div>
          <p className="text-4xl font-black text-gray-900 mt-2">{totalWorkouts > 0 ? '1' : '0'} Days</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h2 className="text-xl font-black text-gray-900">Recent Logs</h2>
          <Link to="/logs" className="text-primary-600 hover:text-primary-700 font-semibold text-sm flex items-center">
            View All <ChevronRight size={16} />
          </Link>
        </div>
        <div className="p-0">
          {workouts.length === 0 ? (
            <div className="p-10 text-center text-gray-500 font-medium bg-gray-50/30">No recent workouts found. Time to hit the gym!</div>
          ) : (
            <div className="divide-y divide-gray-100">
              {workouts.slice(0, 5).map(workout => (
                <div key={workout.id || workout._id} className="p-6 hover:bg-gray-50 transition-colors flex justify-between items-center">
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-1">{workout.comments || 'Workout Session'}</h4>
                    <p className="text-sm font-medium text-gray-500 flex items-center gap-2">
                      <Calendar size={14} /> {new Date(workout.date).toLocaleDateString()}
                      {workout.duration && <><span className="mx-1">•</span> <Clock size={14} /> {workout.duration} min</>}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-primary-700 bg-primary-50 px-4 py-1.5 rounded-full border border-primary-100">
                      {workout.sets?.length || workout.WorkoutSets?.length || 0} Exercises
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
