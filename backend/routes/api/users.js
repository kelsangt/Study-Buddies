const express = require('express');
const router = express.Router();

const passport = require('passport');
const bcrypt = require('bcryptjs');

const { loginUser, restoreUser, requireUser } = require('../../config/passport');
const { isProduction } = require('../../config/keys');

const validateRegisterInput = require('../../validations/register');
const validateLoginInput = require('../../validations/login');

const mongoose = require('mongoose');
const User = mongoose.model('User');

// GET users listing
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch(err) {
    return res.json([]);
  }
});

// POST new account
router.post('/register', validateRegisterInput, async (req, res, next) => {
  const user = await User.findOne({
    $or: [{ email: req.body.email }, { username: req.body.username }]
  });

  if (user) {
    const err = new Error("Validation Error");
    err.statusCode = 400;
    const errors = {};
    if (user.email === req.body.email) {
      errors.email = "A user has already registered with this email";
    }
    if (user.username === req.body.username) {
      errors.username = "A user has already registered with this username";
    }
    err.errors = errors;
    return next(err);
  }

  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    school: req.body.school,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    profileImageUrl: req.body.profileImageUrl,
    linkedInUrl: req.body.linkedInUrl,
    major: req.body.major
  });

  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err;
    bcrypt.hash(req.body.password, salt, async (err, hashedPassword) => {
      if (err) throw err;
      try {
        newUser.hashedPassword = hashedPassword;
        const user = await newUser.save();
        return res.json(await loginUser(user));
      }
      catch(err) {
        next(err);
      }
    })
  });
});

// POST login
router.post('/login', validateLoginInput, async (req, res, next) => {
  passport.authenticate('local', async function(err, user) {
    if (err) return next(err);
    if (!user) {
      const err = new Error('Invalid credentials');
      err.statusCode = 400;
      err.errors = { email: "Invalid credentials" };
      return next(err);
    }
    return res.json(await loginUser(user));
  })(req, res, next);
});

// UPDATE event
router.patch('/', requireUser, async (req, res, next) => {
  try {
    req.user.username = req.body.username;
    req.user.firstName = req.body.firstName;
    req.user.lastName = req.body.lastName;
    req.user.school = req.body.school;
    req.user.major = req.body.major;
    req.user.linkedInUrl = req.body.linkedInUrl;
    req.user.phone = req.body.phone;
    req.user.profileImageUrl = req.body.profileImageUrl;

    await req.user.save();

    return res.json({
      username: req.user.username,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      school: req.user.school,
      major: req.user.major,
      linkedInUrl: req.user.linkedInUrl,
      phone: req.user.phone,
      profileImageUrl: req.user.profileImageUrl
    });
  } catch(err) {
    const error = new Error('Event not found');
    error.statusCode = 404;
    error.errors = { message: "No event found with that id" };
    return next(error);
  }
})

// GET current user info
router.get('/current', restoreUser, async (req, res) => {
  if (!isProduction) {
    const csrfToken = req.csrfToken();
    res.cookie("CSRF-TOKEN", csrfToken);
  }
  if (!req.user) return res.json(null);

  const today = new Date().toLocaleDateString("en-us").split("T")[0];
  
  const user = await User.findById(req.user._id)
                          .populate({
                            path: "createdEvents", 
                            select: "_id name location description startTime endTime",
                            populate: [
                              {
                                path: "location",
                                select: "_id name latitude longitude imageUrl"
                              },
                              {
                                path: "requesters",
                                select: "_id username profileImageUrl"
                              },
                              {
                                path: "attendees",
                                select: "_id username profileImageUrl"
                              }
                            ],
                            match: {
                              "startTime": { $gte: today }
                            }
                          })
                          .populate({
                            path: "joinedEvents", 
                            select: "_id name location description startTime endTime",
                            populate: [
                              {
                                path: "creator",
                                select: "_id username profileImageUrl"
                              },
                              {
                                path: "location",
                                select: "_id name latitude longitude imageUrl"
                              },
                              {
                                path: "attendees",
                                select: "_id username profileImageUrl"
                              }
                            ],
                            match: {
                              "startTime": { $gte: today }
                            }
                          })
                          .populate({
                            path: "requestedEvents", 
                            select: "_id name location description startTime endTime",
                            populate: [
                              {
                                path: "creator",
                                select: "_id username profileImageUrl"
                              },
                              {
                                path: "location",
                                select: "_id name latitude longitude imageUrl"
                              },
                              {
                                path: "attendees",
                                select: "_id username profileImageUrl"
                              }
                            ],
                            match: {
                              "startTime": { $gte: today }
                            }
                          })
  res.json(user);
});

module.exports = router;
