const express = require('express');
const { createJob, sendJobAlerts, fetchAllJobs } = require('../controllers/jobController');
const protect = require('../middleware/authMiddleware');
const { createInterview, getInterviews, updateInterview, deleteInterview } = require('../controllers/interview');

const router = express.Router();

router.post('/post', createJob);
router.post('/send-alerts', sendJobAlerts);
router.post("/create", createInterview);
router.get('/jobs', fetchAllJobs)
router.get('/', getInterviews)
router.put('/:id', updateInterview); // Update interview
router.delete('/:id', deleteInterview); // Delete interview

module.exports = router;
