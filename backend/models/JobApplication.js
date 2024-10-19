const mongoose = require('mongoose');

const jobApplicationSchema = new mongoose.Schema({
    jobTitle: { type: String, required: true },
    jobDescription: { type: String, required: true },
    experienceLevel: { type: String, required: true },
    candidates: [{ type: String, required: true }],
    endDate: { type: Date, required: true }
});

module.exports = mongoose.model('JobApplication', jobApplicationSchema);
