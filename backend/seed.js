require('dotenv').config();
const mongoose = require('mongoose');
const Exercise = require('./models/Exercise');
const connectDB = require('./config/database');

const exercises = [
  { name: 'Barbell Bench Press', description: 'Compound chest exercise', category: 'Chest', muscle_group: 'Chest', equipment: 'Barbell', difficulty: 'intermediate', type: 'strength' },
  { name: 'Barbell Squat', description: 'Compound leg exercise', category: 'Legs', muscle_group: 'Quadriceps', equipment: 'Barbell', difficulty: 'intermediate', type: 'strength' },
  { name: 'Deadlift', description: 'Compound back/leg exercise', category: 'Back', muscle_group: 'Lower Back', equipment: 'Barbell', difficulty: 'advanced', type: 'strength' },
  { name: 'Pull-up', description: 'Bodyweight back exercise', category: 'Back', muscle_group: 'Lats', equipment: 'Bodyweight', difficulty: 'intermediate', type: 'strength' },
  { name: 'Push-up', description: 'Bodyweight chest exercise', category: 'Chest', muscle_group: 'Chest', equipment: 'Bodyweight', difficulty: 'beginner', type: 'strength' },
  { name: 'Dumbbell Curl', description: 'Isolation bicep exercise', category: 'Arms', muscle_group: 'Biceps', equipment: 'Dumbbell', difficulty: 'beginner', type: 'strength' },
  { name: 'Triceps Extension', description: 'Isolation triceps exercise', category: 'Arms', muscle_group: 'Triceps', equipment: 'Cable', difficulty: 'beginner', type: 'strength' },
  { name: 'Leg Press', description: 'Machine leg exercise', category: 'Legs', muscle_group: 'Quadriceps', equipment: 'Machine', difficulty: 'beginner', type: 'strength' },
  { name: 'Treadmill Running', description: 'Cardio', category: 'Cardio', muscle_group: 'Full Body', equipment: 'Machine', difficulty: 'beginner', type: 'cardio' },
];

const seedDB = async () => {
  try {
    await connectDB();
    await Exercise.deleteMany();
    await Exercise.insertMany(exercises);
    console.log('Advanced Exercises seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();
