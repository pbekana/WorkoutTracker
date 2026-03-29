const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  category: { type: String },
  muscle_group: { type: String },
  equipment: { type: String },
  difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'] },
  type: { type: String, enum: ['strength', 'cardio', 'stretching', 'plyometrics', 'powerlifting', 'olympic_weightlifting'] }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

module.exports = mongoose.model('Exercise', exerciseSchema);
