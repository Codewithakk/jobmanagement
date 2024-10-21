const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const Company = require('../models/User'); // Assuming 'Company' is part of your User model.
const { validationResult } = require('express-validator');
const otpGenerator = require('otp-generator');

// Generate JWT Token for authentication
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // Token expiration set to 30 days
  });
};

// Send Verification Email with OTP
const sendOtpEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: `${process.env.COMPANY_NAME} <${process.env.EMAIL_USERNAME}>`,
    to: email,
    subject: 'Account Verification - Your OTP',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 8px; border: 1px solid #ddd;">
        <div style="background-color: #007bff; color: white; padding: 10px; border-radius: 8px 8px 0 0;">
          <h2 style="text-align: center; margin: 0;">Welcome to ${process.env.COMPANY_NAME}!</h2>
        </div>
  
        <div style="padding: 20px; background-color: white; border-radius: 0 0 8px 8px;">
          <p style="font-size: 16px; color: #333;">Hello,</p>
  
          <p style="font-size: 16px; color: #333;">Thank you for signing up with <strong>${process.env.COMPANY_NAME}</strong>! Please use the OTP below to verify your email address and complete your account setup.</p>
          
          <div style="text-align: center; margin: 20px 0;">
            <p style="font-size: 18px; font-weight: bold; background-color: #f0f0f0; display: inline-block; padding: 10px 20px; border-radius: 5px; border: 1px solid #ccc;">
              ${otp}
            </p>
          </div>
  
          <p style="font-size: 16px; color: #333;">If you did not create an account, no further action is required.</p>
          
          <p style="font-size: 16px; color: #333;">For any assistance, feel free to contact our support team.</p>
  
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;">
          
          <p style="font-size: 14px; color: #999;">Best regards,<br>The ${process.env.COMPANY_NAME} Team</p>
        </div>
  
        <div style="text-align: center; margin-top: 10px;">
          <p style="font-size: 12px; color: #888;">&copy; ${new Date().getFullYear()} ${process.env.COMPANY_NAME}. All rights reserved.</p>
          <p style="font-size: 12px; color: #888;">Need help? <a href="mailto:support@gmail.com" style="color: #007bff; text-decoration: none;">Contact Support</a></p>
        </div>
      </div>
    `,
  };
  

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw new Error('Failed to send verification email.');
  }
};

// Send OTP during registration (placeholder for SMS sending)
const sendOtpToPhone = (phone, otp) => {
  console.log(`Sending OTP ${otp} to phone number: ${phone}`);
  // Here you would integrate with an actual SMS service like Twilio, etc.
};

// Register New Company and Send OTPs
exports.registerCompany = async (req, res) => {
  const { companyName, email, password, contactNumber, employeeSize } = req.body;

  // Validate input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const companyExists = await Company.findOne({ email });
    if (companyExists) {
      return res.status(400).json({ message: 'Company already exists' });
    }

    const emailOtp = otpGenerator.generate(6, { upperCase: false, specialChars: false });
    const phoneOtp = otpGenerator.generate(6, { upperCase: false, specialChars: false });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new company
    const company = await Company.create({
      companyName,
      email,
      password: hashedPassword,
      contactNumber,
      employeeSize,
      emailOtp,
      phoneOtp,
      isEmailVerified: false,
      isPhoneVerified: true,
    });

    // Send OTPs
    await sendOtpEmail(email, emailOtp);
    sendOtpToPhone(contactNumber, phoneOtp);

    res.status(200).json({
      message: 'Company registered successfully. Please verify your email and phone.',
      companyId: company._id,
    });
  } catch (error) {
    console.error('Error registering company:', error);
    res.status(500).json({ message: 'Error registering company', error: error.message });
  }
};

// Verify Email OTP
exports.verifyEmail = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const company = await Company.findOne({ email });
    if (!company) {
      return res.status(400).json({ message: 'Invalid email' });
    }
    if (otp !== company.emailOtp) {
      return res.status(400).json({ message: 'Invalid Email OTP' });
    }

    company.isEmailVerified = true;
    company.emailOtp = null; // Clear OTP after verification
    await company.save();

    res.json({ message: 'Email verified successfully.' });
  } catch (error) {
    console.error('Error verifying email OTP:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Phone OTP Verification
exports.verifyPhone = async (req, res) => {
  const { contactNumber, otp } = req.body;

  try {
    const company = await Company.findOne({ contactNumber });
    if (!company) {
      return res.status(400).json({ message: 'Invalid phone number' });
    }

    // Check if the entered OTP is correct or if it matches '123456' (for testing purposes)
    if (otp === company.phoneOtp || otp === '123456') {
      company.isPhoneVerified = true;
      company.phoneOtp = null; // Clear OTP after successful verification
      await company.save();

      return res.status(200).json({ message: 'Phone verified successfully.' });
    } else {
      return res.status(400).json({ message: 'Invalid Phone OTP' });
    }
  } catch (error) {
    console.error('Error verifying phone OTP:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};



// Company Login
exports.loginCompany = async (req, res) => {
  const { email, password } = req.body;

  try {
    const company = await Company.findOne({ email });
    if (!company) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    if (!company.isEmailVerified || !company.isPhoneVerified) {
      return res.status(400).json({ message: 'Please verify your email and phone first' });
    }

    const isMatch = await bcrypt.compare(password, company.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(company._id);
    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Logout Company
exports.logoutCompany = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Error logging out' });
    }
    res.clearCookie('authToken');
    res.json({ message: 'Logged out successfully' });
  });
};
