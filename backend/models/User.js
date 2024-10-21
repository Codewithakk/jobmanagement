const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  contactNumber: { type: String, required: true },
  employeeSize: { type: Number },
  emailOtp: { type: String },  // Temporarily store email OTP
  phoneOtp: { type: String },  // Temporarily store phone OTP
  isEmailVerified: { type: Boolean, default: false },
  isPhoneVerified: { type: Boolean, default: true },
});

module.exports = mongoose.model('Company', companySchema);
