const Job = require('../models/JobApplication');
const nodemailer = require('nodemailer');
require('dotenv').config();


// Middleware to check if the company is logged in
const isAuthenticated = (req, res, next) => {
  if (!req.session.companyId) {
    return res.status(401).json({ message: 'Unauthorized. Please log in.' });
  }
  next();
};

// Create Job Posting
exports.createJob = isAuthenticated; // Use the authentication middleware
exports.createJob = async (req, res) => {
  const { jobTitle, jobDescription, experienceLevel, candidates, endDate } = req.body;
  const companyId = req.session.companyId; // Use session data

  // Validate input data
  if (!jobTitle || !jobDescription || !experienceLevel || !candidates || !endDate) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const job = await Job.create({
      companyId,
      jobTitle,
      jobDescription,
      experienceLevel,
      candidates,
      endDate,
    });

    res.status(201).json({ message: 'Job posted successfully', job });
  } catch (error) {
    res.status(500).json({ message: 'Error posting job', error });
  }
};

// Send Job Alerts to Candidates
exports.sendJobAlerts = isAuthenticated; // Use the authentication middleware
exports.sendJobAlerts = async (req, res) => {
  const { candidates, jobIds } = req.body; // Update jobId to jobIds

  // Validate input data
  if (!candidates || !jobIds || jobIds.length === 0) {
    return res.status(400).json({ message: 'Candidate emails and at least one job ID are required' });
  }

  // Fetch job details from the database
  let jobDetails;
  try {
    jobDetails = await Job.find({ '_id': { $in: jobIds } }); // Fetch multiple jobs
    if (!jobDetails.length) {
      return res.status(404).json({ message: 'No jobs found for the provided IDs' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching job details', error });
  }

  // Set up email transporter
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USERNAME, // Use environment variables for security
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Prepare email content
  const jobDescriptions = jobDetails.map(job => `
    <div class="job-section">
      <h2 class="job-title">${job.jobTitle}</h2>
      <p class="job-detail"><strong>Description:</strong> ${job.jobDescription}</p>
      <p class="job-detail"><strong>Experience Level:</strong> ${job.experienceLevel}</p>
      <p class="job-detail"><strong>Application Deadline:</strong> ${new Date(job.endDate).toLocaleDateString()}</p>
    </div>
  `).join('');
  

  const mailOptions = {
    from: 'Your Company <no-reply@yourcompany.com>',
    to: candidates.join(','), // Join emails into a comma-separated string
    subject: `Exciting Job Opportunities`,
    html: `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 20px;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            h1 {
              color: #333;
              text-align: center;
            }
            p {
              line-height: 1.5;
              color: #555;
            }
            .job-section {
              margin-bottom: 20px;
              padding: 15px;
              border: 1px solid #e0e0e0;
              border-radius: 5px;
              background-color: #fafafa;
              transition: transform 0.2s;
            }
            .job-section:hover {
              transform: scale(1.02);
            }
            .job-title {
              color: #007BFF;
              font-size: 20px;
              margin: 0;
            }
            .job-detail {
              margin: 5px 0;
            }
            .footer {
              text-align: center;
              margin-top: 20px;
              font-size: 14px;
              color: #777;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>New Job Alerts!</h1>
            <p>Dear Candidate,</p>
            <p>We are pleased to announce new job opportunities that may be of interest to you:</p>
            ${jobDescriptions}
            <p>We encourage you to apply for these positions. If you have any questions, feel free to reach out.</p>
            <div class="footer">
              <p>Best regards,<br>Your Company Team</p>
            </div>
          </div>
        </body>
      </html>
    `,
  };
  

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Job alerts sent successfully' });
  } catch (error) {
    console.error('Error sending job alerts:', error);
    res.status(500).json({ message: 'Error sending job alerts. Please try again later.', error });
  }
};

// Fetch all jobs
exports.fetchAllJobs = isAuthenticated; // Use the authentication middleware
exports.fetchAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ companyId: req.session.companyId }); // Find jobs for the authenticated company
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching jobs', error });
  }
};
