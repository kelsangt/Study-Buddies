const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Location = mongoose.model('Location');

const { requireUser } = require('../../config/passport');

// GET all locations
router.get('/', async (req, res) => {
  try {
    const locations = await Location.find();
    return res.json(locations);
  } catch(err) {
    return res.json([]);
  }
});

module.exports = router;
