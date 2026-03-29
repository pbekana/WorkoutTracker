const mongoose = require('mongoose');

const blockSchema = new mongoose.Schema({
  exerciseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise', required: true },
  sets: { type: Number, default: 3 },
  reps: { type: Number, default: 10 },
  rest_timer: { type: Number, default: 60 } // seconds
}, { _id: false });

const daySchema = new mongoose.Schema({
  day_name: { type: String, required: true }, // e.g., 'Chest & Triceps'
  exercises: [blockSchema]
});

const routineSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  description: { type: String },
  difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'intermediate' },
  days: [daySchema],
  isPublic: { type: Boolean, default: false }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

module.exports = mongoose.model('Routine', routineSchema);
