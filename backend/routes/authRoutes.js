const express = require('express');
const { registerCompany, loginCompany, logoutCompany, verifyEmail , verifyPhone} = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const sendEmail = require('../utils/sendEmail');

const router = express.Router();

router.post('/register', registerCompany);
router.post('/login', loginCompany);
router.post('/logout', (req, res) => {
    // Your logout logic here (e.g., clearing session, tokens, etc.)
    res.status(200).json({ message: 'Successfully logged out' });
  });
// router.post('/send-mobile-otp', sendOtpToPhone )
router.post('/verify-email', verifyEmail);
router.post('/verify-phone', verifyPhone)
// router.get('/send-email', sendEmail);

module.exports = router;
