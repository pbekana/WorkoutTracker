import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from '../services/api';
import { Plus, Trash2, Save, ArrowLeft } from 'lucide-react';

const RoutineBuilder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState('beginner');
  const [days, setDays] = useState([]);
  const [exercisesData, setExercisesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const exRes = await api.get('/exercises');
        setExercisesData(exRes.data);

        if (isEditing) {
          const res = await api.get(`/routines`); // There is no GET /routines/:id route by default in routines.js, we filter manually
          const routine = res.data.find(r => r._id === id);
          if (routine) {
            setName(routine.name);
            setDescription(routine.description);
            setDifficulty(routine.difficulty);
            
            // Re-map the exercises so they store their object ID instead of populated object for saving back
            const loadedDays = (routine.days || []).map(day => ({
              ...day,
              exercises: (day.exercises || []).map(ex => ({
                exerciseId: ex.exerciseId?._id || ex.exerciseId,
                sets: ex.sets || 3,
                reps: ex.reps || 10,
                rest_timer: ex.rest_timer || 60
              }))
            }));
            
            setDays(loadedDays);
          }
        }
      } catch (err) {
        console.error('Failed to load data for routine builder', err);
      } finally {
        setLoading(false);
      }
    };
    fetchInitialData();
  }, [id, isEditing]);

  const addDay = () => {
    setDays([...days, { day_name: `Day ${days.length + 1}`, exercises: [] }]);
  };

  const removeDay = (dayIndex) => {
    setDays(days.filter((_, idx) => idx !== dayIndex));
  };

  const updateDayName = (dayIndex, newName) => {
    const newDays = [...days];
    newDays[dayIndex].day_name = newName;
    setDays(newDays);
  };

  const addExercise = (dayIndex) => {
    if (exercisesData.length === 0) return;
    const newDays = [...days];
    newDays[dayIndex].exercises.push({
      exerciseId: exercisesData[0]._id || exercisesData[0].id,
      sets: 3,
      reps: 10,
      rest_timer: 60
    });
    setDays(newDays);
  };

  const updateExercise = (dayIndex, exIndex, field, value) => {
    const newDays = [...days];
    newDays[dayIndex].exercises[exIndex][field] = value;
    setDays(newDays);
  };

  const removeExercise = (dayIndex, exIndex) => {
    const newDays = [...days];
    newDays[dayIndex].exercises = newDays[dayIndex].exercises.filter((_, idx) => idx !== exIndex);
    setDays(newDays);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const payload = { name, description, difficulty, days };
      if (isEditing) {
        await api.put(`/routines/${id}`, payload);
      } else {
        await api.post('/routines', payload);
      }
      navigate('/routines');
    } catch (err) {
      alert('Failed to save routine. Please try again.');
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading builder...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 animate-fade-in pb-24">
      <Link to="/routines" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-800 font-medium mb-6 transition">
        <ArrowLeft size={20} /> Back to Routines
      </Link>
      
      <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-200">
        <h1 className="text-3xl font-black mb-6 text-gray-900 border-b border-gray-100 pb-4">
          {isEditing ? 'Edit Routine' : 'Create Routine'}
        </h1>
        
        <form onSubmit={handleSave} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">Routine Name</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 font-medium text-gray-900"
                placeholder="e.g., Push Pull Legs, Full Body Split..."
                required
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
              <textarea 
                value={description} 
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 font-medium text-gray-900 resize-none"
                placeholder="Describe the focus or goal of this routine..."
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Difficulty</label>
              <select 
                value={difficulty} 
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 font-medium text-gray-900"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black text-gray-900">Training Days</h2>
              <button 
                type="button" 
                onClick={addDay}
                className="flex items-center gap-2 bg-primary-50 hover:bg-primary-100 text-primary-700 px-4 py-2 rounded-xl transition-colors text-sm font-bold"
              >
                <Plus size={18} /> Add Day
              </button>
            </div>

            <div className="space-y-6">
              {days.map((day, dayIndex) => (
                <div key={dayIndex} className="bg-gray-50 border border-gray-200 rounded-2xl overflow-hidden p-6 space-y-6">
                  <div className="flex justify-between items-center gap-4 border-b border-gray-200 pb-4">
                    <input 
                      type="text" 
                      value={day.day_name} 
                      onChange={(e) => updateDayName(dayIndex, e.target.value)}
                      className="bg-white border border-gray-300 rounded-xl px-4 py-2 font-bold text-gray-900 focus:ring-2 focus:ring-primary-500 focus:outline-none flex-1 max-w-sm"
                      placeholder="e.g., Push Day"
                      required
                    />
                    <button 
                      type="button" 
                      onClick={() => removeDay(dayIndex)} 
                      className="text-red-500 hover:bg-red-50 p-2 rounded-xl font-bold flex items-center gap-2 text-sm transition"
                    >
                      <Trash2 size={18} /> <span className="hidden md:inline">Remove Day</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {day.exercises.map((ex, exIndex) => (
                      <div key={exIndex} className="grid grid-cols-12 gap-3 items-end bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                        
                        <div className="col-span-12 md:col-span-5">
                          <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Exercise</label>
                          <select 
                            value={ex.exerciseId}
                            onChange={(e) => updateExercise(dayIndex, exIndex, 'exerciseId', e.target.value)}
                            className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm font-semibold bg-gray-50 focus:border-primary-500 focus:bg-white transition"
                          >
                            {exercisesData.map(e => (
                              <option key={e._id || e.id} value={e._id || e.id}>{e.name}</option>
                            ))}
                          </select>
                        </div>
                        
                        <div className="col-span-4 md:col-span-2">
                          <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Sets</label>
                          <input type="number" min="1" value={ex.sets} onChange={(e) => updateExercise(dayIndex, exIndex, 'sets', parseInt(e.target.value))} className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm font-semibold bg-gray-50 text-center" />
                        </div>
                        
                        <div className="col-span-4 md:col-span-2">
                          <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Reps</label>
                          <input type="number" min="1" value={ex.reps} onChange={(e) => updateExercise(dayIndex, exIndex, 'reps', parseInt(e.target.value))} className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm font-semibold bg-gray-50 text-center" />
                        </div>

                        <div className="col-span-4 md:col-span-2">
                          <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Rest (s)</label>
                          <input type="number" min="0" step="15" value={ex.rest_timer} onChange={(e) => updateExercise(dayIndex, exIndex, 'rest_timer', parseInt(e.target.value))} className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm font-semibold bg-gray-50 text-center" title="Rest timer in seconds" />
                        </div>
                        
                        <div className="col-span-12 md:col-span-1 flex justify-end pb-1 md:pb-0">
                          <button type="button" onClick={() => removeExercise(dayIndex, exIndex)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors w-full md:w-auto flex justify-center">
                            <Trash2 size={20} />
                          </button>
                        </div>

                      </div>
                    ))}
                    
                    <button 
                      type="button" 
                      onClick={() => addExercise(dayIndex)}
                      className="flex items-center justify-center gap-2 w-full py-3 bg-white border-2 border-dashed border-gray-300 hover:border-primary-400 text-gray-500 hover:text-primary-600 rounded-xl font-bold transition-colors text-sm"
                    >
                      <Plus size={18} /> Add Exercise
                    </button>
                  </div>
                </div>
              ))}

              {days.length === 0 && (
                <div className="text-center py-12 bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl">
                  <h3 className="text-lg font-bold text-gray-700 mb-1">No Training Days</h3>
                  <p className="text-gray-500 font-medium text-sm">Add your first day to start building this routine.</p>
                </div>
              )}
            </div>
          </div>

          <div className="pt-8 border-t border-gray-100 mt-10">
            <button 
              type="submit" 
              className="w-full flex justify-center items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white py-4 rounded-xl font-bold text-lg transition-all shadow-xl shadow-primary-500/20"
            >
              <Save size={24} /> {isEditing ? 'Save Changes' : 'Create Routine'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RoutineBuilder;
