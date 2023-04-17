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
    const startDay = new Date(req.query.date);
    const endDay = new Date(req.query.date);
    endDay.setDate(endDay.getDate() + 1);

    const events = await Event.find({
      startTime: {
        $gte: startDay,
        $lt: endDay
      }
    })
    .populate("creator", "_id username profileImageUrl")
    .populate("attendees", "_id username profileImageUrl")
    .populate("requesters", "_id username profileImageUrl")
    .sort({ startTime: 1 });

    return res.json(events);
  } catch(err) {
    return res.json([]);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
                            .populate("creator", "_id username profileImageUrl")
                            .populate("attendees", "_id username profileImageUrl");
    return res.json(event);
  } catch(err) {
    const error = new Error('Event not found');
    error.statusCode = 404;
    error.errors = { message: "No event found with that id" };
    return next(error);
  }
})

module.exports = router;
