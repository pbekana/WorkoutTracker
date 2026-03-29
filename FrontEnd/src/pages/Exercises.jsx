import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Search, Filter, Database } from 'lucide-react';
import CoachModal from '../components/CoachModal';

const Exercises = () => {
  const [exercises, setExercises] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedCoach, setSelectedCoach] = useState(null);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const res = await api.get('/exercises');
        setExercises(res.data);
      } catch (err) {
        console.error('Failed to load exercises');
      } finally {
        setLoading(false);
      }
    };
    fetchExercises();
  }, []);

  const filteredExercises = exercises.filter(ex => 
    ex.name.toLowerCase().includes(search.toLowerCase()) || 
    (ex.muscle_group && ex.muscle_group.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-gray-200 pb-6">
        <div>
          <h1 className="text-4xl font-black text-gray-900 mb-1 flex items-center gap-3">
            <Database className="text-primary-500 bg-primary-50 p-2 rounded-xl" size={48} />
            Exercise Database
          </h1>
          <p className="text-gray-500 font-medium text-lg">Browse and discover new exercises to add to your routines.</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text"
            placeholder="Search exercises by name or muscle group..."
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:bg-white outline-none font-medium text-gray-900"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition w-full md:w-auto">
          <Filter size={20} />
          Filters
        </button>
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-400 font-medium">Loading database...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExercises.map(ex => (
            <div 
              key={ex.id || ex._id} 
              onClick={() => setSelectedCoach(ex)}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md hover:border-blue-200 transition-all cursor-pointer group"
            >
              <div className="h-40 bg-gray-100 border-b border-gray-100 relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-transparent transition-colors z-10" />
                <img 
                  src={getExerciseImage(ex.type)} 
                  alt={ex.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-black text-gray-900 mb-2 truncate">{ex.name}</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wide rounded-full border border-blue-100">{ex.muscle_group}</span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-bold uppercase tracking-wide rounded-full border border-gray-200">{ex.equipment || 'No Equip'}</span>
                </div>
                <p className="text-sm text-gray-600 font-medium line-clamp-2">{ex.description || 'No description provided.'}</p>
              </div>
            </div>
          ))}
          {filteredExercises.length === 0 && (
            <div className="col-span-full py-20 text-center text-gray-500 font-medium text-lg">
              No exercises found matching "{search}"
            </div>
          )}
        </div>
      )}

      {selectedCoach && (
        <CoachModal 
          exercise={selectedCoach} 
          onClose={() => setSelectedCoach(null)} 
        />
      )}
    </div>
  );
};

const getExerciseImage = (type) => {
  switch (type) {
    case 'cardio':
      return 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=800&q=80'; // Running on track
    case 'stretching':
      return 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80'; // Yoga/stretching
    case 'powerlifting':
    case 'olympic_weightlifting':
      return 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80'; // Heavy lifting
    case 'plyometrics':
      return 'https://images.unsplash.com/photo-1554629947-334ff61d85dc?w=800&q=80'; // Jumping/athletic
    case 'strength':
    default:
      return 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&q=80'; // General gym equipment
  }
};

export default Exercises;
