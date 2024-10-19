const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    index: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: '5m', // This will automatically delete the OTP document after 5 minutes
  },
});

// Create the model
const Otp = mongoose.model('Otp', otpSchema);

module.exports = Otp;
