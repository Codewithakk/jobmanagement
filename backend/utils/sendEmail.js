const nodemailer = require('nodemailer');

// Send email function
const sendEmail = async (options) => {
  // Create a transporter object with the email service credentials
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // You can use other email services like SendGrid, Mailgun, etc.
    auth: {
      user: process.env.EMAIL_USERNAME, // Gmail username from .env
      pass: process.env.EMAIL_PASSWORD, // Gmail password or app-specific password from .env
    },
  });

  // Define the email options (recipient, subject, and content)
  const mailOptions = {
    from: 'Your Company <akshay.singh.as.2002@gmail.com>', // Sender's address
    to: options.to, // Recipient's email
    subject: options.subject, // Subject of the email
    text: options.text, // Plain text body of the email
    html: options.html, // HTML version (optional)
  };

  // Send the email
  await transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error(`Error sending email: ${err}`);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });
};

module.exports = sendEmail;
