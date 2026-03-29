import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Plus, Trash2, Save, Play, CheckCircle2, Circle } from 'lucide-react';

const WorkoutBuilder = () => {
  const navigate = useNavigate();
  const [exercisesData, setExercisesData] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [comments, setComments] = useState('');
  const [duration, setDuration] = useState('');
  const [sets, setSets] = useState([]);
  const [isLogging, setIsLogging] = useState(false);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const res = await api.get('/exercises');
        setExercisesData(res.data);
      } catch (err) {
        console.error('Failed to load exercises');
      }
    };
    fetchExercises();
  }, []);

  const addExercise = () => {
    if (exercisesData.length === 0) return;
    setSets([...sets, { exerciseId: exercisesData[0]._id || exercisesData[0].id, sets: 3, reps: 10, weight: 0, completed: false }]);
  };

  const removeSet = (index) => {
    setSets(sets.filter((_, i) => i !== index));
  };

  const updateSet = (index, field, value) => {
    const newSets = [...sets];
    newSets[index][field] = value;
    setSets(newSets);
  };

  const toggleComplete = (index) => {
    const newSets = [...sets];
    newSets[index].completed = !newSets[index].completed;
    setSets(newSets);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await api.post('/workouts', {
        date,
        duration: duration ? parseInt(duration) : null,
        comments,
        sets
      });
      navigate('/dashboard');
    } catch (err) {
      alert('Failed to save workout');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 animate-fade-in pb-24">
      <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-200">
        <h1 className="text-3xl font-black mb-6 text-gray-900 border-b border-gray-100 pb-4">Workout Logger</h1>
        
        <form onSubmit={handleSave} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Date</label>
              <input 
                type="date" 
                value={date} 
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 font-medium text-gray-900"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Duration (mins)</label>
              <input 
                type="number" 
                value={duration} 
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 font-medium text-gray-900"
                placeholder="60"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Session Title</label>
              <input 
                type="text" 
                value={comments} 
                onChange={(e) => setComments(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 font-medium text-gray-900"
                placeholder="e.g., Chest & Triceps"
              />
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-black text-gray-900">Exercises Tracker</h2>
              <button 
                type="button" 
                onClick={addExercise}
                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-xl transition-colors text-sm font-bold"
              >
                <Plus size={18} /> Add Exercise
              </button>
            </div>

            <div className="space-y-4">
              {sets.map((set, index) => {
                const isComplete = set.completed;
                return (
                  <div key={index} className={`grid grid-cols-12 gap-3 items-center p-4 rounded-2xl border transition-all ${isComplete ? 'bg-green-50 border-green-200 shadow-sm' : 'bg-white border-gray-200 shadow-sm hover:border-primary-300'}`}>
                    
                    <div className="col-span-12 md:col-span-4 transition-opacity">
                      <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Exercise</label>
                      <select 
                        value={set.exerciseId}
                        onChange={(e) => updateSet(index, 'exerciseId', e.target.value)}
                        className={`w-full border rounded-xl px-3 py-2 text-sm font-semibold transition-colors ${isComplete ? 'bg-green-50 border-green-200 text-green-900' : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-primary-500'}`}
                      >
                        {exercisesData.map(ex => (
                          <option key={ex._id || ex.id} value={ex._id || ex.id}>{ex.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="col-span-3 md:col-span-2">
                      <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Sets</label>
                      <input type="number" min="1" value={set.sets} onChange={e => updateSet(index, 'sets', parseInt(e.target.value))} className={`w-full border rounded-xl px-3 py-2 text-sm font-semibold ${isComplete ? 'bg-green-50 border-green-200 text-green-900' : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-primary-500'}`} />
                    </div>

                    <div className="col-span-3 md:col-span-2">
                      <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Reps</label>
                      <input type="number" min="1" value={set.reps} onChange={e => updateSet(index, 'reps', parseInt(e.target.value))} className={`w-full border rounded-xl px-3 py-2 text-sm font-semibold ${isComplete ? 'bg-green-50 border-green-200 text-green-900' : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-primary-500'}`} />
                    </div>

                    <div className="col-span-4 md:col-span-2">
                      <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Lbs</label>
                      <input type="number" min="0" step="0.5" value={set.weight} onChange={e => updateSet(index, 'weight', parseFloat(e.target.value))} className={`w-full border rounded-xl px-3 py-2 text-sm font-semibold ${isComplete ? 'bg-green-50 border-green-200 text-green-900' : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-primary-500'}`} />
                    </div>

                    <div className="col-span-2 md:col-span-2 flex justify-end md:justify-center items-end pb-1 gap-2">
                      <button type="button" onClick={() => toggleComplete(index)} className={`p-2 rounded-xl transition ${isComplete ? 'text-green-600 bg-green-100 hover:bg-green-200' : 'text-gray-400 bg-gray-100 hover:bg-primary-100 hover:text-primary-600'}`}>
                        {isComplete ? <CheckCircle2 size={22} className="fill-green-100" /> : <Circle size={22} />}
                      </button>
                      <button type="button" onClick={() => removeSet(index)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                        <Trash2 size={20} />
                      </button>
                    </div>

                  </div>
                );
              })}
              
              {sets.length === 0 && (
                <div className="text-center py-12 bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl">
                  <div className="w-16 h-16 bg-white shadow-sm rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400"><Play size={24} /></div>
                  <h3 className="text-lg font-bold text-gray-700 mb-1">Ready to train?</h3>
                  <p className="text-gray-500 font-medium text-sm">Add an exercise to start logging your sets.</p>
                </div>
              )}
            </div>
          </div>

          <div className="pt-8 border-t border-gray-100 sticky bottom-0 bg-white/80 backdrop-blur-md p-4 -mx-4 md:mx-0 rounded-b-3xl -mb-8 mt-10">
            <button 
              type="submit" 
              className="w-full flex justify-center items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white py-4 rounded-xl font-bold text-lg transition-all shadow-xl shadow-primary-500/20"
            >
              <Save size={24} /> Complete Workout
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WorkoutBuilder;
