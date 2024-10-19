import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Input } from "../../components"; // Import your custom components
import { BASE_URL } from '../../api/api';
import Navbar from 'pages/Nav';

const SendJobAlerts = () => {
  const [candidates, setCandidates] = useState("");
  const [selectedJobIds, setSelectedJobIds] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch job listings when the component mounts
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/jobs/all`); // Adjust the endpoint accordingly
        setJobs(response.data); // Set the fetched jobs to state
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError("Failed to fetch jobs.");
      }
    };

    fetchJobs();
  }, []);

  const handleJobSelect = (jobId) => {
    setSelectedJobIds(prevIds => 
      prevIds.includes(jobId) 
        ? prevIds.filter(id => id !== jobId) // Deselect the job if already selected
        : [...prevIds, jobId] // Select the job
    );
  };

  const handleSendAlerts = async (e) => {
    e.preventDefault();

    if (!candidates || selectedJobIds.length === 0) {
      setError("Both candidate emails and at least one job must be selected.");
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/jobs/send-alerts`, {
        candidates: candidates.split(",").map(email => email.trim()), // Split and trim email addresses
        jobIds: selectedJobIds, // Pass selected job IDs
      });
      setSuccess(response.data.message);
      setError(""); // Clear any previous errors
      setSelectedJobIds([]); // Clear selected job IDs
      setCandidates(""); // Clear candidates input
    } catch (err) {
      setError(err.response?.data?.message || "Error sending job alerts");
      setSuccess(""); // Clear any previous success messages
    }
  };

  return (
    <div className="w-full bg-white px-6 py-8">
      <Navbar />
      <h2 className="text-xl sm:text-1xl font-bold text-center">Send Job Alerts to Candidates</h2>
      <form onSubmit={handleSendAlerts} className="flex flex-col gap-4 mt-4">
        <Input
          placeholder="Enter candidate emails (comma separated)"
          value={candidates}
          onChange={(e) => setCandidates(e.target.value)}
          className="w-full"
          style={{ padding: '12px', borderRadius: '4px', border: '1px solid #ccc' }} // Adding inline styles for better mobile experience
        />
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold">Select Jobs:</h3>
          {jobs.map(job => (
            <label key={job._id} className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={selectedJobIds.includes(job._id)}
                onChange={() => handleJobSelect(job._id)}
                className="mr-2"
              />
              <span>{job.jobTitle}</span>
            </label>
          ))}
        </div>
        <Button 
          type="submit" 
          size="md" 
          className="min-w-[310px] rounded-lg px-3 py-2 text-sm sm:px-4 sm:py-2" // Adjusted padding and size for smaller screens
        >
          Send Job Alerts
        </Button>
      </form>
      {success && <div className="text-green-600 mt-4">{success}</div>}
      {error && <div className="text-red-600 mt-4">{error}</div>}
    </div>
  );
};

export default SendJobAlerts;
