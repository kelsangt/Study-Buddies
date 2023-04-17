const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const User = mongoose.model('User');
const Event = mongoose.model('Event');
const Location = mongoose.model('Location');

const { requireUser } = require('../../config/passport');

// GET all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find()
                              .sort({ startTime: 1 });
    return res.json(events);
  } catch(err) {
    return res.json([]);
  }
});

module.exports = router;
