const express = require('express');
const router = express.Router();
const Workout = require('../models/Workout');
const { protect } = require('../middleware/authMiddleware');

router.get('/progress', protect, async (req, res) => {
  try {
    const workouts = await Workout.find({ userId: req.user.id })
      .populate('sets.exerciseId')
      .sort({ date: 1 });

    const progress = workouts.map(w => {
      const sets = w.sets || [];
      return {
        date: w.date,
        duration: w.duration,
        totalWeightLifted: sets.reduce((sum, set) => sum + (set.weight * set.reps * set.sets), 0),
        totalDistance: sets.reduce((sum, set) => sum + set.distance, 0)
      };
    });

    res.json(progress);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
