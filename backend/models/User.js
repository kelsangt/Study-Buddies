const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  hashedPassword: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  school: {
    type: String,
    required: true
  },
  major: {
    type: String,
    required: true
  },
  profileImageUrl: {
    type: String,
    required: false
  },
  linkedInUrl: {
    type: String,
    required: false
  },
  phone: {
    type: String,
    required: false
  },
  createdEvents: [{ 
    type: Schema.Types.ObjectId,
    ref: 'Event'
  }],
  joinedEvents: [{
    type: Schema.Types.ObjectId,
    ref: 'Event'
  }],
  requestedEvents: [{
    type: Schema.Types.ObjectId,
    ref: 'Event'
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);