const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Location = mongoose.model('Location');

// GET all locations
router.get('/', async (req, res) => {
  try {
    const locations = await Location.find();
    return res.json(locations);
  } catch(err) {
    return res.json([]);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const location = await Location.findById(req.params.id);
    return res.json(location);
  } catch(err) {
    const error = new Error('Location not found');
    error.statusCode = 404;
    error.errors = { message: "No location found with that id" };
    return next(error);
  }
})

module.exports = router;
