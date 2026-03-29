import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { CheckCircle2, Circle, Clock, ArrowRight, Play, Dumbbell, Save, X, Info } from 'lucide-react';
import CoachModal from '../components/CoachModal';

const ActiveWorkout = () => {
  const [searchParams] = useSearchParams();
  const routineId = searchParams.get('routineId');
  const navigate = useNavigate();

  const [routine, setRoutine] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [loading, setLoading] = useState(true);

  // Active state
  const [activeExerciseIdx, setActiveExerciseIdx] = useState(0);
  const [completedSets, setCompletedSets] = useState({}); // { exIdx: [true, false, true] }
  const [recordedWeights, setRecordedWeights] = useState({}); // { exIdx: 135 }
  const [restTimer, setRestTimer] = useState(0); // seconds remaining
  const [timerActive, setTimerActive] = useState(false);
  const [showCoach, setShowCoach] = useState(false);

  useEffect(() => {
    const fetchRoutine = async () => {
      try {
        const res = await api.get('/routines');
        const found = res.data.find(r => r._id === routineId || r.id === routineId);
        if (found) {
          setRoutine(found);
          // If only one day, auto-select it
          if (found.days && found.days.length === 1) {
            initializeDay(found.days[0]);
          }
        } else {
          alert('Routine not found!');
          navigate('/routines');
        }
      } catch (err) {
        console.error('Failed to fetch routine', err);
      } finally {
        setLoading(false);
      }
    };
    if (routineId) {
      fetchRoutine();
    } else {
      navigate('/routines');
    }
  }, [routineId, navigate]);

  useEffect(() => {
    let interval;
    if (timerActive && restTimer > 0) {
      interval = setInterval(() => {
        setRestTimer(prev => prev - 1);
      }, 1000);
    } else if (restTimer === 0 && timerActive) {
      setTimerActive(false);
      // Play a sound or notify when timer ends (could add Audio API later)
    }
    return () => clearInterval(interval);
  }, [timerActive, restTimer]);

  const initializeDay = (day) => {
    setSelectedDay(day);
    const initialSets = {};
    const initialWeights = {};
    (day.exercises || []).forEach((ex, idx) => {
      initialSets[idx] = new Array(ex.sets || 3).fill(false);
      initialWeights[idx] = '';
    });
    setCompletedSets(initialSets);
    setRecordedWeights(initialWeights);
  };

  const handleCompleteSet = (exIdx, setIdx, restDuration) => {
    const newSets = { ...completedSets };
    newSets[exIdx][setIdx] = true;
    setCompletedSets(newSets);

    // Start rest timer
    setRestTimer(restDuration || 60);
    setTimerActive(true);

    // If all sets in this exercise are done, we could prompt moving to next, but let user manually click next.
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleFinishWorkout = async () => {
    if (!window.confirm('Finish and log this workout?')) return;
    try {
      // Build the sets array as expected by POST /workouts
      const setsPayload = (selectedDay.exercises || []).map((ex, idx) => {
        const completedArr = completedSets[idx] || [];
        const repsAchieved = completedArr.filter(Boolean).length > 0 ? ex.reps : 0; // rough estimation
        const weightAchieved = parseFloat(recordedWeights[idx]) || 0;
        return {
          exerciseId: ex.exerciseId?._id || ex.exerciseId,
          sets: ex.sets,
          reps: repsAchieved, // Alternatively logging target reps
          weight: weightAchieved,
          completed: completedArr.every(Boolean)
        };
      });

      await api.post('/workouts', {
        date: new Date().toISOString().split('T')[0],
        duration: 60, // Could implement total session timer
        comments: `${routine.name} - ${selectedDay.day_name}`,
        sets: setsPayload
      });
      navigate('/dashboard');
    } catch (err) {
      alert('Failed to save workout log');
    }
  };

  if (loading) return <div className="p-8 text-center animate-pulse">Loading Training Session...</div>;
  if (!routine) return null;

  // Day Selection Screen
  if (!selectedDay) {
    return (
      <div className="max-w-2xl mx-auto p-4 md:p-8 animate-fade-in">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center">
          <div className="w-20 h-20 bg-primary-50 text-primary-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Play size={36} className="ml-2" />
          </div>
          <h1 className="text-3xl font-black text-gray-900 mb-2">{routine.name}</h1>
          <p className="text-gray-500 font-medium mb-8">Which day are you training today?</p>
          
          <div className="space-y-4">
            {(routine.days || []).map((day, idx) => (
              <button 
                key={idx}
                onClick={() => initializeDay(day)}
                className="w-full bg-gray-50 hover:bg-primary-50 border border-gray-200 hover:border-primary-200 text-left p-6 rounded-2xl transition group flex justify-between items-center"
              >
                <div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-700">{day.day_name}</h3>
                  <p className="text-sm text-gray-500 font-medium mt-1">{(day.exercises || []).length} Exercises</p>
                </div>
                <ArrowRight className="text-gray-300 group-hover:text-primary-500 transition-transform group-hover:translate-x-1" size={24} />
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const exercisesList = selectedDay.exercises || [];
  
  if (exercisesList.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-4 md:p-8 animate-fade-in pb-32">
        <div className="flex justify-between items-center bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100 mb-6">
          <div>
            <h1 className="text-xl md:text-2xl font-black text-gray-900 leading-tight">{routine.name}</h1>
            <p className="text-primary-600 font-bold text-sm">{selectedDay.day_name}</p>
          </div>
          <button onClick={() => navigate('/routines')} className="text-gray-400 hover:text-red-500 transition bg-gray-50 hover:bg-red-50 p-3 rounded-xl">
            <X size={24} />
          </button>
        </div>
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="w-20 h-20 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <Dumbbell size={36} />
          </div>
          <h2 className="text-2xl font-black text-gray-900 mb-2">No Exercises Found</h2>
          <p className="text-gray-500 font-medium">This day doesn't have any exercises configured yet. Please edit your routine.</p>
        </div>
      </div>
    );
  }

  const currentExercise = exercisesList[activeExerciseIdx];
  const isLastExercise = activeExerciseIdx === exercisesList.length - 1;
  const isExerciseFullyCompleted = completedSets[activeExerciseIdx]?.every(Boolean);

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 animate-fade-in pb-32">
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100 mb-6 sticky top-4 z-10 lg:top-8">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-gray-900 leading-tight">{routine.name}</h1>
          <p className="text-primary-600 font-bold text-sm">{selectedDay.day_name}</p>
        </div>
        <button onClick={() => navigate('/routines')} className="text-gray-400 hover:text-red-500 transition bg-gray-50 hover:bg-red-50 p-3 rounded-xl">
          <X size={24} />
        </button>
      </div>

      {/* Floating Rest Timer */}
      {timerActive && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-4 z-50 animate-slide-up border-4 border-gray-800">
          <Clock size={24} className="text-primary-400 animate-pulse" />
          <div className="text-3xl font-black tabular-nums tracking-widest">{formatTime(restTimer)}</div>
          <button 
            onClick={() => setTimerActive(false)}
            className="ml-4 text-xs font-bold uppercase tracking-wider bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg transition"
          >
            Skip
          </button>
        </div>
      )}

      {/* Exercise Navigation Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-2 -mx-4 px-4 md:mx-0 md:px-0 hide-scrollbar">
        {exercisesList.map((ex, idx) => {
          const isDone = completedSets[idx]?.every(Boolean);
          const isActive = idx === activeExerciseIdx;
          return (
            <button
              key={idx}
              onClick={() => setActiveExerciseIdx(idx)}
              className={`flex-shrink-0 px-4 py-3 rounded-xl text-sm font-bold border transition-all flex items-center gap-2 ${isActive ? 'bg-primary-500 text-white border-primary-500 shadow-lg shadow-primary-500/20' : isDone ? 'bg-green-50 text-green-700 border-green-200' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
            >
              {isDone ? <CheckCircle2 size={16} /> : <span className="w-5 h-5 rounded-full border-2 border-current flex items-center justify-center text-[10px]">{idx + 1}</span>}
              <span className="truncate max-w-[120px]">{ex.exerciseId?.name || `Exercise ${idx+1}`}</span>
            </button>
          );
        })}
      </div>

      {/* Active Exercise View */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden relative">
        <div className="p-6 md:p-10 border-b border-gray-100 bg-gradient-to-br from-gray-50 to-white">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="flex items-center gap-3 text-primary-500 font-bold mb-3 uppercase tracking-wider text-sm">
                <Dumbbell size={18} /> Exercise {activeExerciseIdx + 1} of {exercisesList.length}
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-gray-900">{currentExercise.exerciseId?.name || 'Unknown Exercise'}</h2>
            </div>
            <button 
              onClick={() => setShowCoach(true)} 
              className="flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-600 px-4 py-3 rounded-xl font-bold transition shadow-sm border border-blue-100"
            >
              <Info size={20} />
              <span className="hidden md:inline">Coach Guide</span>
            </button>
          </div>
          
          <div className="flex flex-wrap items-center gap-4">
            <div className="bg-white border border-gray-200 px-5 py-3 rounded-2xl shadow-sm">
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Target</div>
              <div className="text-xl font-black text-gray-900">{currentExercise.sets} <span className="text-gray-400 text-lg font-bold">Sets</span> × {currentExercise.reps} <span className="text-gray-400 text-lg font-bold">Reps</span></div>
            </div>
            
            <div className="bg-white border border-gray-200 px-5 py-3 rounded-2xl shadow-sm flex items-center gap-3">
              <div>
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Weight (Lbs)</div>
                <input 
                  type="number" 
                  value={recordedWeights[activeExerciseIdx]}
                  onChange={e => setRecordedWeights({...recordedWeights, [activeExerciseIdx]: e.target.value})}
                  className="w-24 font-black text-xl text-gray-900 focus:outline-none border-b-2 border-transparent focus:border-primary-500 bg-transparent transition"
                  placeholder="0.0"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-10 bg-white">
          <h3 className="text-lg font-black text-gray-900 mb-6 flex items-center gap-2">
            Track Sets <span className="bg-gray-100 text-gray-500 text-xs px-2 py-0.5 rounded-md">{completedSets[activeExerciseIdx]?.filter(Boolean).length} / {currentExercise.sets}</span>
          </h3>
          
          <div className="space-y-4">
            {completedSets[activeExerciseIdx]?.map((isComplete, setIdx) => (
              <div key={setIdx} className={`flex items-center justify-between p-4 md:p-6 rounded-2xl border-2 transition-all ${isComplete ? 'bg-green-50 border-green-200' : 'bg-white border-gray-100 shadow-sm hover:border-primary-300'}`}>
                <div className="flex items-center gap-6">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black ${isComplete ? 'bg-green-200 text-green-800' : 'bg-gray-100 text-gray-500'}`}>
                    {setIdx + 1}
                  </div>
                  <div>
                    <div className={`font-bold ${isComplete ? 'text-green-800' : 'text-gray-900'}`}>{currentExercise.reps} Reps</div>
                    <div className="text-sm font-medium text-gray-500">Rest: {currentExercise.rest_timer}s</div>
                  </div>
                </div>
                
                {isComplete ? (
                  <button 
                    onClick={() => {
                      const newSets = {...completedSets};
                      newSets[activeExerciseIdx][setIdx] = false;
                      setCompletedSets(newSets);
                    }}
                    className="flex items-center gap-2 text-green-700 bg-green-100 hover:bg-green-200 px-4 py-2 rounded-xl font-bold text-sm transition"
                  >
                    <CheckCircle2 size={18} /> Completed
                  </button>
                ) : (
                  <button 
                    onClick={() => handleCompleteSet(activeExerciseIdx, setIdx, currentExercise.rest_timer)}
                    className="bg-gray-900 hover:bg-black text-white px-6 py-3 rounded-xl font-bold transition shadow-md flex items-center gap-2"
                  >
                    <CheckCircle2 size={18} /> Done
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-end">
            {!isLastExercise ? (
              <button 
                onClick={() => setActiveExerciseIdx(prev => prev + 1)}
                className={`flex items-center gap-2 px-8 py-4 rounded-xl font-bold transition-all ${isExerciseFullyCompleted ? 'bg-primary-500 hover:bg-primary-600 text-white shadow-lg shadow-primary-500/20' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
              >
                Next Exercise <ArrowRight size={20} />
              </button>
            ) : (
              <button 
                onClick={handleFinishWorkout}
                className={`flex items-center gap-2 px-8 py-4 rounded-xl font-bold transition-all bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/20 w-full md:w-auto justify-center`}
              >
                <Save size={24} /> Finish Workout
              </button>
            )}
          </div>
        </div>
      </div>

      {showCoach && (
        <CoachModal 
          exercise={currentExercise.exerciseId} 
          onClose={() => setShowCoach(false)} 
        />
      )}
    </div>
  );
};

export default ActiveWorkout;
