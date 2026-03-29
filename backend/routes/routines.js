const express = require('express');
const router = express.Router();
const Routine = require('../models/Routine');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, async (req, res) => {
  try {
    const routines = await Routine.find({ userId: req.user.id })
      .populate('days.exercises.exerciseId')
      .sort({ updatedAt: -1 });
    res.json(routines);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', protect, async (req, res) => {
  try {
    const { name, description, difficulty, days, isPublic } = req.body;
    const routine = await Routine.create({
      userId: req.user.id,
      name,
      description,
      difficulty,
      days: days || [],
      isPublic
    });

    const populatedRoutine = await Routine.findById(routine._id).populate('days.exercises.exerciseId');
    res.status(201).json(populatedRoutine);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', protect, async (req, res) => {
  try {
    const { id } = req.params;
    const routine = await Routine.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      req.body,
      { new: true }
    ).populate('days.exercises.exerciseId');
    
    if (!routine) return res.status(404).json({ error: 'Routine not found' });
    res.json(routine);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    const { id } = req.params;
    const routine = await Routine.findOneAndDelete({ _id: id, userId: req.user.id });
    if (!routine) return res.status(404).json({ error: 'Routine not found' });
    res.json({ message: 'Routine deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
