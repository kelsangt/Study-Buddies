const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  location: {
    type: Schema.Types.ObjectId,
    ref: 'Location'
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  attendees: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  requesters: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Event', eventSchema);