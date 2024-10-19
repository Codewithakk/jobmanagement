// models/Interview.js
const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  takenBy: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true, // Assuming time is stored as a string, e.g., "14:00"
  },
}, {
  timestamps: true, // Automatically add createdAt and updatedAt timestamps
});

const Interview = mongoose.model('Interview', interviewSchema);

module.exports = Interview;
