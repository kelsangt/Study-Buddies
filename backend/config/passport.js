const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');
const { secretOrKey } = require('./keys');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');

const mongoose = require('mongoose');
const User = mongoose.model('User');
const Event = mongoose.model('Event');

passport.use(new LocalStrategy({
  session: false,
  usernameField: 'email',
  passwordField: 'password',
}, async function (email, password, done) {
  const user = await User.findOne({ email })
                          .populate({
                            path: "createdEvents", 
                            select: "_id name location startTime endTime",
                            populate: [
                              {
                                path: "location",
                                select: "_id name latitude longitude"
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
                          })
                          .populate({
                            path: "joinedEvents", 
                            select: "_id name location startTime endTime",
                            populate: [
                              {
                                path: "creator",
                                select: "_id username profileImageUrl"
                              },
                              {
                                path: "location",
                                select: "_id name latitude longitude"
                              },
                              {
                                path: "attendees",
                                select: "_id username profileImageUrl"
                              }
                            ]
                          })
                          .populate({
                            path: "requestedEvents", 
                            select: "_id name location startTime endTime",
                            populate: [
                              {
                                path: "creator",
                                select: "_id username profileImageUrl"
                              },
                              {
                                path: "location",
                                select: "_id name latitude longitude"
                              },
                              {
                                path: "attendees",
                                select: "_id username profileImageUrl"
                              }
                            ]
                          })
  if (user) {
    bcrypt.compare(password, user.hashedPassword, (err, isMatch) => {
      if (err || !isMatch) done(null, false);
      else done(null, user);
    });
  } else
    done(null, false);
}));

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = secretOrKey;

passport.use(new JwtStrategy(options, async (jwtPayload, done) => {
  try {
    const user = await User.findById(jwtPayload._id)
    if (user) return done(null, user);
    return done(null, false);
  }
  catch(err) {
    done(err);
  }
}));

exports.loginUser = async function(user) {
  const uniqueUserInfo = {
    _id: user._id,
    email: user.email,
  };

  const userInfo = {
    _id: user._id,
    username: user.username,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    school: user.school,
    major: user.major,
    profileImageUrl: user.profileImageUrl,
    linkedInUrl: user.linkedInUrl,
    phone: user.phone,
    createdEvents: user.createdEvents,
    joinedEvents: user.joinedEvents,
    requestedEvents: user.requestedEvents
  };

  const token = await jwt.sign(
    uniqueUserInfo,
    secretOrKey,
    { expiresIn: 3600 }
  );
  return {
    user: userInfo,
    token
  };
};

exports.requireUser = passport.authenticate('jwt', { session: false });

exports.restoreUser = (req, res, next) => {
  return passport.authenticate('jwt', { session: false }, function(err, user) {
    if (err) return next(err);
    if (user) req.user = user;
    next();
  })(req, res, next);
};