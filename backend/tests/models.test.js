const mongoose = require('mongoose');
const User = require('../models/User');
const Exercise = require('../models/Exercise');

describe('Database Models Tests (Mongoose)', () => {
  beforeAll(async () => {
    const testUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/workouttracker_test';
    await mongoose.connect(testUri);
    await User.deleteMany();
    await Exercise.deleteMany();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should create a User successfully', async () => {
    const user = await User.create({
      username: 'testuser_mongo',
      email: 'mongo@test.com',
      password: 'hashedpassword123'
    });
    expect(user._id).toBeDefined();
    expect(user.username).toBe('testuser_mongo');
  });

  it('should create an Exercise successfully', async () => {
    const exercise = await Exercise.create({
      name: 'Push Up ' + Date.now(),
      category: 'strength',
      muscle_group: 'chest'
    });
    expect(exercise._id).toBeDefined();
  });
});
