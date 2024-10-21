const Interview = require('../models/interview');
const nodemailer = require('nodemailer');

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Send email notification with HTML content
const sendEmailNotification = async (email, subject, htmlContent) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject: subject,
      html: htmlContent, // Use 'html' for sending HTML emails
    });
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

// Create a new interview
const createInterview = async (req, res) => {
  const { title, takenBy, date, time, email } = req.body;

  try {
    const newInterview = new Interview({
      title,
      takenBy,
      date,
      time,
    });

    await newInterview.save();
// Send email notification to the interviewer
const emailSubject = `Interview Scheduled: ${title}`;
const emailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Interview Scheduled</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f0f8ff;
            animation: fadeIn 1s ease-in-out;
        }

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
            animation: slideIn 1s ease;
        }

        @keyframes slideIn {
            from { transform: translateY(-50px); }
            to { transform: translateY(0); }
        }

        h2 {
            color: #4a90e2;
            text-align: center;
            text-transform: uppercase;
            font-weight: bold;
            letter-spacing: 1.5px;
            margin-bottom: 20px;
            animation: colorChange 3s infinite;
        }

        @keyframes colorChange {
            0% { color: #4a90e2; }
            50% { color: #ff6347; }
            100% { color: #4a90e2; }
        }

        p {
            line-height: 1.6;
            color: #555;
            font-size: 1.1em;
            margin-bottom: 15px;
        }

        .highlight {
            color: #ff6347;
            font-weight: bold;
        }

        .footer {
            margin-top: 30px;
            text-align: center;
            font-size: 0.9em;
            color: #777;
        }

        .footer a {
            color: #4a90e2;
            text-decoration: none;
        }

        .footer a:hover {
            text-decoration: underline;
        }

        .cta-button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #4a90e2;
            color: #ffffff;
            text-decoration: none;
            font-size: 1.2em;
            border-radius: 5px;
            margin-top: 20px;
            text-align: center;
            transition: background-color 0.3s ease;
        }

        .cta-button:hover {
            background-color: #ff6347;
        }

        @media (max-width: 600px) {
            .container {
                padding: 15px;
            }
            p, h2 {
                font-size: 1em;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Interview Scheduled</h2>
        <p>Dear <span class="highlight">${takenBy}</span>,</p>
        <p>You have an interview titled "<span class="highlight">${title}</span>" scheduled on <span class="highlight">${date}</span> at <span class="highlight">${time}</span>. Please be prepared and make sure you have everything set up for the interview.</p>
        <p>We are excited to meet you!</p>
        <a href="#" class="cta-button">View Interview Details</a>
        <div class="footer">
            <p>If you have any questions, feel free to <a href="#">contact us</a>.</p>
        </div>
    </div>
</body>
</html>
`;

    await sendEmailNotification(email, emailSubject, emailHtml);

    res.status(201).json({ message: 'Interview created successfully', interview: newInterview });
  } catch (error) {
    res.status(400).json({ message: 'Error creating interview', error: error.message });
  }
};

// Get all interviews
const getInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find();
    res.status(200).json(interviews);
  } catch (error) {
    res.status(400).json({ message: 'Error retrieving interviews', error: error.message });
  }
};

// Update an interview by ID
const updateInterview = async (req, res) => {
  const { id } = req.params;
  const { title, takenBy, date, time, email } = req.body;

  try {
    const updatedInterview = await Interview.findByIdAndUpdate(
      id,
      { title, takenBy, date, time },
      { new: true } // Return updated interview
    );

    if (!updatedInterview) {
      return res.status(404).json({ message: 'Interview not found' });
    }

   // Send email notification to the interviewer
const emailSubject = `Interview Scheduled: ${title}`;
const emailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Interview Scheduled</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f0f8ff;
            animation: fadeIn 1s ease-in-out;
        }

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
            animation: slideIn 1s ease;
        }

        @keyframes slideIn {
            from { transform: translateY(-50px); }
            to { transform: translateY(0); }
        }

        h2 {
            color: #4a90e2;
            text-align: center;
            text-transform: uppercase;
            font-weight: bold;
            letter-spacing: 1.5px;
            margin-bottom: 20px;
            animation: colorChange 3s infinite;
        }

        @keyframes colorChange {
            0% { color: #4a90e2; }
            50% { color: #ff6347; }
            100% { color: #4a90e2; }
        }

        p {
            line-height: 1.6;
            color: #555;
            font-size: 1.1em;
            margin-bottom: 15px;
        }

        .highlight {
            color: #ff6347;
            font-weight: bold;
        }

        .footer {
            margin-top: 30px;
            text-align: center;
            font-size: 0.9em;
            color: #777;
        }

        .footer a {
            color: #4a90e2;
            text-decoration: none;
        }

        .footer a:hover {
            text-decoration: underline;
        }

        .cta-button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #4a90e2;
            color: #ffffff;
            text-decoration: none;
            font-size: 1.2em;
            border-radius: 5px;
            margin-top: 20px;
            text-align: center;
            transition: background-color 0.3s ease;
        }

        .cta-button:hover {
            background-color: #ff6347;
        }

        @media (max-width: 600px) {
            .container {
                padding: 15px;
            }
            p, h2 {
                font-size: 1em;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Interview Scheduled</h2>
        <p>Dear <span class="highlight">${takenBy}</span>,</p>
        <p>You have an interview titled "<span class="highlight">${title}</span>" scheduled on <span class="highlight">${date}</span> at <span class="highlight">${time}</span>. Please be prepared and make sure you have everything set up for the interview.</p>
        <p>We are excited to meet you!</p>
        <a href="#" class="cta-button">View Interview Details</a>
        <div class="footer">
            <p>If you have any questions, feel free to <a href="#">contact us</a>.</p>
        </div>
    </div>
</body>
</html>
`;


    await sendEmailNotification(email, emailSubject, emailHtml);

    res.status(200).json({ message: 'Interview updated successfully', interview: updatedInterview });
  } catch (error) {
    res.status(400).json({ message: 'Error updating interview', error: error.message });
  }
};

// Delete an interview by ID
const deleteInterview = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedInterview = await Interview.findByIdAndDelete(id);

    if (!deletedInterview) {
      return res.status(404).json({ message: 'Interview not found' });
    }

    res.status(200).json({ message: 'Interview deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting interview', error: error.message });
  }
};

module.exports = {
  createInterview,
  getInterviews,
  updateInterview,
  deleteInterview,
};
