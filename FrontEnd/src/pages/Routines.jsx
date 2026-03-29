import React, { useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { CalendarDays, Plus, Activity, Clock, Trash2, Edit2, PlayCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Routines = () => {
  const { user } = useContext(AuthContext);
  const [routines, setRoutines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoutines = async () => {
      try {
        const res = await api.get('/routines');
        setRoutines(res.data);
      } catch (err) {
        console.error('Failed to load routines', err);
      } finally {
        setLoading(false);
      }
    };
    fetchRoutines();
  }, []);

  const deleteRoutine = async (id) => {
    if(!window.confirm('Delete this routine?')) return;
    try {
      await api.delete(`/routines/${id}`);
      setRoutines(routines.filter(r => r._id !== id));
    } catch (err) {
      alert('Failed to delete routine');
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-gray-200 pb-6">
        <div>
          <h1 className="text-4xl font-black text-gray-900 mb-1 flex items-center gap-3">
            <CalendarDays className="text-blue-500 bg-blue-50 p-2 rounded-xl" size={48} />
            My Routines
          </h1>
          <p className="text-gray-500 font-medium text-lg">Manage your workout splits and multi-day plans.</p>
        </div>
        <Link to="/routines/new" className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-primary-500/20 transition-all flex items-center gap-2">
          <Plus size={20} /> Create Routine
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-400 font-medium">Loading routines...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {routines.map(routine => (
            <div key={routine._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow">
              <div className="p-6 border-b border-gray-100 flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-black text-gray-900 mb-1">{routine.name}</h3>
                  <p className="text-sm text-gray-500 font-medium">{routine.description || 'No description'}</p>
                </div>
                <div className="flex gap-2">
                  <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wide rounded-full border ${routine.difficulty === 'beginner' ? 'bg-green-50 text-green-700 border-green-100' : routine.difficulty === 'advanced' ? 'bg-red-50 text-red-700 border-red-100' : 'bg-orange-50 text-orange-700 border-orange-100'}`}>
                    {routine.difficulty}
                  </span>
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 flex-1">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Training Days</h4>
                {!routine.days || routine.days.length === 0 ? (
                  <p className="text-sm text-gray-400 font-medium italic px-2">No days configured yet.</p>
                ) : (
                  <div className="space-y-2">
                    {(routine.days || []).map((day, idx) => (
                      <div key={idx} className="flex justify-between items-center bg-white border border-gray-200 p-3 rounded-xl shadow-sm">
                        <span className="font-bold text-gray-800">{day.day_name}</span>
                        <span className="text-xs font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-md">{(day.exercises || []).length} Ex</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="p-4 border-t border-gray-100 flex justify-between items-center bg-white">
                <div className="flex gap-2 text-gray-400">
                  <Link to={`/routines/${routine._id}`} className="block p-2.5 hover:bg-gray-100 hover:text-gray-800 rounded-xl transition"><Edit2 size={18} /></Link>
                  <button onClick={() => deleteRoutine(routine._id)} className="p-2.5 hover:bg-red-50 hover:text-red-500 rounded-xl transition"><Trash2 size={18} /></button>
                </div>
                <Link to={`/workout/active?routineId=${routine._id}`} className="flex items-center gap-2 bg-gray-900 hover:bg-black text-white px-5 py-2.5 rounded-xl font-bold transition text-sm shadow-md">
                  <PlayCircle size={18} /> Train
                </Link>
              </div>
            </div>
          ))}
          
          {routines.length === 0 && (
            <div className="col-span-full py-20 text-center flex flex-col items-center">
              <div className="w-24 h-24 bg-blue-50 text-primary-500 rounded-full flex items-center justify-center mb-6"><CalendarDays size={40} /></div>
              <h3 className="text-2xl font-black text-gray-900 mb-2">No Routines Yet</h3>
              <p className="text-gray-500 font-medium mb-8 max-w-md">Create your first multi-day workout split to get started with structured training.</p>
              <Link to="/routines/new" className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-3.5 rounded-xl font-bold shadow-lg shadow-primary-500/20 transition-all flex items-center gap-2">
                <Plus size={20} /> Create New Routine
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Routines;
