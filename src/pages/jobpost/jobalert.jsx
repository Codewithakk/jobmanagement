import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Input } from "../../components"; // Custom components
import { BASE_URL } from '../../api/api';
import Navbar from 'pages/Nav';

const SendJobAlerts = () => {
  const [candidates, setCandidates] = useState("");
  const [selectedJobIds, setSelectedJobIds] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/jobs`);
        if (response.data && response.data.length > 0) {
          setJobs(response.data); // Set jobs if data is available
        } else {
          setError("No jobs available at the moment.");
        }
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError("Failed to fetch jobs.");
      }
    };

    fetchJobs();
  }, []);

  const handleJobSelect = (jobId) => {
    setSelectedJobIds((prevIds) =>
      prevIds.includes(jobId)
        ? prevIds.filter((id) => id !== jobId) // Deselect job
        : [...prevIds, jobId] // Select job
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
        candidates: candidates.split(",").map((email) => email.trim()),
        jobIds: selectedJobIds,
      });
      setSuccess(response.data.message);
      setError(""); // Clear error message
      setSelectedJobIds([]); // Clear selected job IDs
      setCandidates(""); // Clear candidates input
    } catch (err) {
      setError(err.response?.data?.message || "Error sending job alerts");
      setSuccess(""); // Clear success message on error
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
          style={{ padding: '12px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold">Select Jobs:</h3>
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <label key={job._id} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={selectedJobIds.includes(job._id)}
                  onChange={() => handleJobSelect(job._id)}
                  className="mr-2"
                />
                <span>{job.jobTitle}</span>
              </label>
            ))
          ) : (
            <p>No jobs available to display.</p>
          )}
        </div>
        <Button
          type="submit"
          size="md"
          className="min-w-[310px] rounded-lg px-3 py-2 text-sm sm:px-4 sm:py-2"
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
