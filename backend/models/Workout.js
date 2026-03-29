const mongoose = require('mongoose');

const workoutSetSchema = new mongoose.Schema({
  exerciseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise', required: true },
  sets: { type: Number, default: 0 },
  reps: { type: Number, default: 0 },
  weight: { type: Number, default: 0 },
  distance: { type: Number, default: 0 },
  time: { type: Number, default: 0 },
  completed: { type: Boolean, default: false } // For Jefit-style tracking checkboxes
}, { _id: false });

const workoutSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  routineId: { type: mongoose.Schema.Types.ObjectId, ref: 'Routine' }, // Optional link to a specific routine
  date: { type: Date, required: true, default: Date.now },
  duration: { type: Number }, // in minutes
  comments: { type: String },
  sets: [workoutSetSchema]
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

module.exports = mongoose.model('Workout', workoutSchema);
