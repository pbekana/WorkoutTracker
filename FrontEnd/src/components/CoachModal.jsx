import React, { useEffect } from 'react';
import { X, PlayCircle, Sparkles, Target, AlertCircle } from 'lucide-react';

const CoachModal = ({ exercise, onClose }) => {
  // Prevent scrolling on background when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!exercise) return null;

  const getProTips = () => {
    const tips = [];
    if (exercise.type === 'strength') {
      tips.push(`Control the movement during your ${exercise.name} to maximize time under tension.`);
    } else if (exercise.type === 'cardio') {
      tips.push("Maintain a steady and deep breathing rhythm throughout your session.");
    }
    
    if (exercise.muscle_group) {
      tips.push(`Focus deeply on engaging your ${exercise.muscle_group} throughout the entire range of motion.`);
    }
    
    if (exercise.equipment && exercise.equipment.toLowerCase() !== 'bodyweight' && exercise.equipment.toLowerCase() !== 'none') {
      tips.push(`Ensure the ${exercise.equipment} is gripped or set up correctly before beginning the lift.`);
    }

    if (exercise.difficulty === 'beginner') {
      tips.push("Since you are a beginner, focus completely on your form rather than the weight or speed.");
    }

    if (tips.length < 2) {
      tips.push("Breathe in on the easier phase, and breathe out powerfully on the exertion phase.");
      tips.push("Keep your core tightly braced to protect your lower back and maintain stability.");
    }
    return tips;
  };

  const getExerciseImage = (type) => {
    switch (type) {
      case 'cardio': return 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=800&q=80';
      case 'stretching': return 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80';
      case 'powerlifting': 
      case 'olympic_weightlifting': return 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80';
      case 'plyometrics': return 'https://images.unsplash.com/photo-1554629947-334ff61d85dc?w=800&q=80';
      case 'strength':
      default: return 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&q=80';
    }
  };

  const proTips = getProTips();
  const searchName = encodeURIComponent(exercise.name + " proper form guide");

  const parseInstructions = (text) => {
    if (!text) return [
      `Setup your stance for the ${exercise.name}.`,
      `Perform the movement focusing on your ${exercise.muscle_group || 'target muscles'}.`,
      "Return to the starting position safely."
    ];
    // Split on periods or newlines to get actual sentence-based steps
    const split = text.split(/(?<=\.)\s+|\n+/).filter(s => s.trim().length > 0);
    return split;
  };

  const instructionsSteps = parseInstructions(exercise.description);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl relative z-10 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header Ribbon */}
        <div className="bg-blue-600 p-6 flex justify-between items-start text-white">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md">
              <Sparkles size={24} className="text-blue-100" />
            </div>
            <span className="font-bold tracking-widest uppercase text-xs text-blue-100">Virtual Coach</span>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-xl transition text-blue-100 hover:text-white">
            <X size={24} />
          </button>
        </div>

        {/* Title Area (overlapping the ribbon slightly visually via negative margin if wanted, but standard flows well) */}
        <div className="px-6 md:px-8 pt-6 pb-4 border-b border-gray-100">
          <h2 className="text-3xl font-black text-gray-900 leading-tight mb-2">{exercise.name}</h2>
          <div className="flex flex-wrap gap-2 text-sm">
            <span className="flex items-center gap-1.5 bg-gray-100 text-gray-700 font-bold px-3 py-1 rounded-lg">
              <Target size={16} className="text-gray-400" /> 
              {exercise.muscle_group || 'Full Body'}
            </span>
            {exercise.equipment && (
              <span className="bg-gray-100 text-gray-700 font-bold px-3 py-1 rounded-lg">
                {exercise.equipment}
              </span>
            )}
            {exercise.difficulty && (
              <span className={`font-bold px-3 py-1 rounded-lg uppercase tracking-wider text-[10px] flex items-center ${
                exercise.difficulty === 'beginner' ? 'bg-green-50 text-green-700' :
                exercise.difficulty === 'advanced' ? 'bg-red-50 text-red-700' :
                'bg-orange-50 text-orange-700'
              }`}>
                {exercise.difficulty}
              </span>
            )}
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="px-6 md:px-8 py-6 overflow-y-auto space-y-8 flex-1">
          
          <section className="mb-8">
            <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              <AlertCircle size={16} /> Learning Session
            </h3>
            
            <div className="flex flex-col md:flex-row gap-8">
              {/* Image Section */}
              <div className="md:w-5/12 shrink-0">
                <div className="bg-gray-50 rounded-2xl w-full overflow-hidden border border-gray-200 shadow-sm relative group aspect-[4/5] md:aspect-auto">
                  <div className="absolute inset-0 bg-blue-900/5 group-hover:bg-transparent transition-colors z-10 mix-blend-multiply" />
                  <img 
                    src={getExerciseImage(exercise.type)} 
                    alt="Proper form illustration" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-[10px] font-black uppercase text-blue-800 border border-blue-100/50 shadow-sm z-20">
                    {exercise.type || 'Workout'}
                  </div>
                </div>
              </div>
              
              {/* Steps Timeline */}
              <div className="md:w-7/12">
                 <div className="space-y-6 border-l-[3px] border-blue-100 ml-4 pl-8 py-2">
                    {instructionsSteps.map((step, idx) => (
                      <div key={idx} className="relative">
                        <div className="absolute -left-[45px] top-0 bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-black ring-4 ring-white shadow-sm">
                          {idx + 1}
                        </div>
                        <p className="text-gray-700 font-medium leading-relaxed bg-white/50">{step}</p>
                      </div>
                    ))}
                 </div>
              </div>
            </div>
          </section>

          <section className="bg-blue-50 border border-blue-100 rounded-2xl p-5 md:p-6">
            <h3 className="text-sm font-black text-blue-500 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Sparkles size={16} /> Coach's Pro Tips
            </h3>
            <ul className="space-y-3">
              {proTips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="min-w-[24px] h-6 bg-blue-200 text-blue-700 rounded-full flex items-center justify-center text-xs font-black mt-0.5">
                    {idx + 1}
                  </div>
                  <span className="text-blue-900 font-medium leading-snug">{tip}</span>
                </li>
              ))}
            </ul>
          </section>

        </div>

        {/* Footer actions */}
        <div className="p-6 bg-gray-50 border-t border-gray-100 mt-auto">
          <a 
            href={`https://www.youtube.com/results?search_query=${searchName}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-bold shadow-lg shadow-red-600/20 transition-all text-lg"
          >
            <PlayCircle size={24} /> Watch Video Tutorial
          </a>
        </div>
      </div>
    </div>
  );
};

export default CoachModal;
