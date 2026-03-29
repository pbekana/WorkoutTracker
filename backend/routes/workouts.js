const express = require('express');
const router = express.Router();
const Workout = require('../models/Workout');
const { protect } = require('../middleware/authMiddleware');

const mapWorkoutForFrontend = (workout) => {
  const obj = workout.toObject ? workout.toObject() : workout;
  obj.WorkoutSets = (obj.sets || []).map(set => ({
    ...set,
    Exercise: set.exerciseId
  }));
  return obj;
};

router.get('/', protect, async (req, res) => {
  try {
    const workouts = await Workout.find({ userId: req.user.id })
      .populate('sets.exerciseId')
      .sort({ date: -1, scheduled_time: -1 });
    
    res.json(workouts.map(mapWorkoutForFrontend));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', protect, async (req, res) => {
  try {
    const { date, scheduled_time, duration, comments, sets } = req.body;
    const session = await Workout.create({
      userId: req.user.id,
      date,
      scheduled_time,
      duration,
      comments,
      sets: sets || []
    });

    const populatedSession = await Workout.findById(session._id).populate('sets.exerciseId');
    res.status(201).json(mapWorkoutForFrontend(populatedSession));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', protect, async (req, res) => {
  try {
    const { id } = req.params;
    const session = await Workout.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      req.body,
      { new: true }
    ).populate('sets.exerciseId');
    if (!session) return res.status(404).json({ error: 'Workout session not found' });
    res.json(mapWorkoutForFrontend(session));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    const { id } = req.params;
    const session = await Workout.findOneAndDelete({ _id: id, userId: req.user.id });
    if (!session) return res.status(404).json({ error: 'Workout session not found' });
    res.json({ message: 'Workout session deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
