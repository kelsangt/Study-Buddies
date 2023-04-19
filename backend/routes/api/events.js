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
    const startDay = new Date(req.query.startDate);

    let endDay;
    if (req.query.endDate) {
      endDay = new Date(req.query.endDate);
    } else {
      endDay = new Date(req.query.startDate);
      endDay.setDate(endDay.getDate() + 1);
    }
    

    const events = await Event.find({
      startTime: {
        $gte: startDay,
        $lt: endDay
      }
    })
    .populate("creator", "_id username profileImageUrl")
    .populate("attendees", "_id username profileImageUrl")
    .populate("requesters", "_id username profileImageUrl")
    .populate("location", "_id name latitude longitude imageUrl")
    .sort({ startTime: 1 });

    return res.json(events);
  } catch(err) {
    return res.json([]);
  }
});

// GET specific event
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

// POST new event
router.post('/', requireUser, async (req, res, next) => {
  try {
    const newEvent = new Event({
      creator: req.user._id,
      name: req.body.name,
      description: req.body.description,
      location: req.body.location,
      startTime: req.body.startTime,
      endTime: req.body.endTime
    });

    let event = await newEvent.save();
    event = await event.populate("location", "_id name latitude longitude");
    return res.json(event);
  } catch(err) {
    next(err);
  }
})

// DELETE event or DELETE attendance
router.delete('/:id', requireUser, async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);

    if (event.creator.toString() === req.user._id.toString()) {
      // delete event from creator's createdEvents
      await User.updateOne(
        { _id: req.user._id }, 
        { $pullAll: { createdEvents: [event._id] }}
      )
      /* other way to do the above */
      // let idx = req.user.createdEvents.indexOf(event._id)
      // req.user.createdEvents.splice(idx, 1);
      // await req.user.save();
      
      // delete event from each attendees' attendedEvents
      await User.updateMany(
        { _id: { $in: event.attendees } },
        { $pullAll: { attendedEvents: [event._id] }}
      )

      // delete event from each requesters' attendedEvents
      await User.updateMany(
        { _id: { $in: event.requesters } },
        { $pullAll: { requestedEvents: [event._id] }}
      )

      // delete the event itself
      await event.deleteOne();
    } else {
      // delete event from current user's joinedEvents
      await User.findByIdAndUpdate(
        req.user._id,
        { $pullAll: { joinedEvents: [event._id] } }
      )

      await Event.findByIdAndUpdate(
        req.params.id,
        {$pullAll: {attendees: [req.user._id] } }
      )

      /* other way to do the above */
      // let idx = req.user.joinedEvents.indexOf(event._id)
      // req.user.joinedEvents.splice(idx, 1);
      // await req.user.save();

      // idx = event.attendees.indexOf(req.user._id)
      // event.attendees.splice(idx, 1);
      // await event.save();
    }

    return res.json(null);
  } catch(err) {
    const error = new Error('Event not found');
    error.statusCode = 404;
    error.errors = { message: "No event found with that id" };
    return next(error);
  }
})

// UPDATE event
router.patch('/:id', requireUser, async (req, res, next) => {
  try {
    let event = await Event.findById(req.params.id);
    if (event.creator.toString() !== req.user._id.toString()) {
      const error = new Error('Unauthorized');
      error.statusCode = 401;
      error.errors = { message: "Must be creator to update this event" };
      return next(error);
    }

    event.name = req.body.name,
    event.description = req.body.description,
    event.location = req.body.location,
    event.startTime = req.body.startTime,
    event.endTime = req.body.endTime 
    await event.save();

    return res.json(event);
  } catch(err) {
    const error = new Error('Event not found');
    error.statusCode = 404;
    error.errors = { message: "No event found with that id" };
    return next(error);
  }
})

// event requests
// POST new request
router.post('/requests/:id', requireUser, async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);

    if (event.requesters.includes(req.user._id)) {
      const error = new Error('Unprocessable Entity');
      error.statusCode = 422;
      error.errors = { message: "Already made a request" };
      return next(error);
    } else if (event.attendees.includes(req.user._id)) {
      const error = new Error('Unprocessable Entity');
      error.statusCode = 422;
      error.errors = { message: "Already joined this event" };
      return next(error);
    } else if (event.creator.toString() === req.user._id.toString()) {
      const error = new Error('Unprocessable Entity');
      error.statusCode = 422;
      error.errors = { message: "Can't request to join an event the user created" };
      return next(error);
    }
    
    event.requesters.push(req.user._id);
    await event.save();

    return res.json(event);
  } catch(err) {
    const error = new Error('Event not found');
    error.statusCode = 404;
    error.errors = { message: "No event found with that id" };
    return next(error);
  }
})

// DELETE request
router.delete('/requests/:id', requireUser, async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event.requesters.includes(req.user._id)) {
      const error = new Error('Request not found');
      error.statusCode = 404;
      error.errors = { message: "No request found" };
      return next(error);
    }

    const idx = event.requesters.indexOf(req.user._id)
    event.requesters.splice(idx, 1);
    await event.save();

    return res.json(event);
  } catch(err) {
    const error = new Error('Event not found');
    error.statusCode = 404;
    error.errors = { message: "No event found with that id" };
    return next(error);
  }
})

// UPDATE request status
router.patch('/requests/:id/:userId', requireUser, async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);

    if (event.creator.toString() !== req.user._id.toString()) {
      const error = new Error('Unauthorized');
      error.statusCode = 401;
      error.errors = { message: "Must be creator to update this request" };
      return next(error);
    }

    const user = await User.findById(req.params.userId);

    let idx = event.requesters.indexOf(user._id)
    event.requesters.splice(idx, 1);

    idx = user.requestedEvents.indexOf(event._id)
    user.requestedEvents.splice(idx, 1);

    if (req.body.choice === "accept") {
      event.attendees.push(user._id);
      user.joinedEvents.push(event._id);
    }

    await user.save();
    await event.save();

    return res.json(event);
  } catch(err) {
    const error = new Error('Event or user not found');
    error.statusCode = 404;
    error.errors = { message: "No event or user found with that id" };
    return next(error);
  }
})

// PATCH remove attendee
router.patch('/attendees/:id/:userId', requireUser, async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);

    if (event.creator.toString() !== req.user._id.toString()) {
      const error = new Error('Unauthorized');
      error.statusCode = 401;
      error.errors = { message: "Must be creator to update this event" };
      return next(error);
    }

    const user = await User.findById(req.params.userId)

    let idx = event.attendees.indexOf(user._id)
    event.attendees.splice(idx, 1);

    idx = user.joinedEvents.indexOf(event._id)
    user.joinedEvents.splice(idx, 1);

    await user.save();
    await event.save();

    return res.json(event);
  } catch(err) {
    const error = new Error('Event or user not found');
    error.statusCode = 404;
    error.errors = { message: "No event or user found with that id" };
    return next(error);
  }
})

module.exports = router;
