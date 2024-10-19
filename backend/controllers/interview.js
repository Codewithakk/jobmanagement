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
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 20px;
                background-color: #f4f4f4;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            h2 {
                color: #333;
            }
            p {
                line-height: 1.5;
                color: #555;
            }
            .footer {
                margin-top: 20px;
                font-size: 0.9em;
                color: #999;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h2>Interview Scheduled</h2>
            <p>Dear <strong>${takenBy}</strong>,</p>
            <p>You have an interview titled "<strong>${title}</strong>" scheduled on <strong>${date}</strong> at <strong>${time}</strong>. Please be prepared.</p>
            <p>Best Regards,</p>
            <p>Interview Scheduler</p>
            <div class="footer">
                <p>If you have any questions, feel free to contact us.</p>
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

    // Send email notification for the updated interview
    const emailSubject = `Interview Updated: ${title}`;
    const emailHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Interview Updated</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 20px;
                background-color: #f4f4f4;
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
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                transition: transform 0.3s ease;
            }
            .container:hover {
                transform: translateY(-5px);
            }
            h2 {
                color: #333;
                text-align: center;
                margin-bottom: 20px;
            }
            p {
                line-height: 1.5;
                color: #555;
                margin: 10px 0;
            }
            .footer {
                margin-top: 20px;
                font-size: 0.9em;
                color: #999;
                text-align: center;
            }
            @media (max-width: 600px) {
                .container {
                    padding: 15px;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h2>Interview Updated</h2>
            <p>Dear <strong>${takenBy}</strong>,</p>
            <p>Your interview titled "<strong>${title}</strong>" has been updated. It is now scheduled on <strong>${date}</strong> at <strong>${time}</strong>.</p>
            <p>Best Regards,</p>
            <p>Interview Scheduler</p>
            <div class="footer">
                <p>If you have any questions, feel free to contact us.</p>
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
