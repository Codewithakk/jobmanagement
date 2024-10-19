import React, { useState } from "react";
import { Button, DatePicker, Text, Input } from "../../components";
import axios from "axios";
import { BASE_URL } from '../../api/api';

export default function JobApplicationFormSection() {
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [candidates, setCandidates] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/jobs/post`, {
        jobTitle,
        jobDescription,
        experienceLevel,
        candidates,
        endDate,
      });

      setSuccess(response.data.message);
      setError(""); // Clear any previous errors

      // Reset form fields after successful submission
      setJobTitle("");
      setJobDescription("");
      setExperienceLevel("");
      setCandidates("");
      setEndDate("");
    } catch (err) {
      console.error(err); // Log the full error for debugging
      setError(err.response?.data?.message || "Error creating job");
      setSuccess(""); // Clear any previous success messages
    }
  };

  // Media query styles for responsiveness
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '10px',
      maxWidth: '90vw',
      margin: '0 auto',
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    },
    heading: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      marginBottom: '20px',
      textAlign: 'center',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      gap: '10px',
    },
    label: {
      fontSize: '0.875rem',
      fontWeight: 'bold',
      marginBottom: '0.5rem',
    },
    input: {
      padding: '0.5rem',
      borderRadius: '4px',
      border: '1px solid #ccc',
      width: '100%',
    },
    textarea: {
      padding: '0.5rem',
      borderRadius: '4px',
      border: '1px solid #ccc',
      minHeight: '100px',
      width: '100%',
    },
    select: {
      padding: '0.5rem',
      borderRadius: '4px',
      border: '1px solid #ccc',
      width: '100%',
    },
    button: {
      padding: '0.75rem',
      backgroundColor: '#007bff',
      color: '#fff',
      borderRadius: '4px',
      border: 'none',
      width: '100%',
      fontSize: '0.875rem',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    errorMessage: {
      color: "red",
      fontWeight: "bold",
      fontSize: '0.875rem',
    },
    successMessage: {
      color: "green",
      fontWeight: "bold",
      fontSize: '0.875rem',
    },
  };

  // Adding media queries for responsiveness
  if (window.innerWidth < 768) {
    styles.container.padding = '10px 20px';
    styles.input.padding = '0.25rem';
    styles.textarea.padding = '0.25rem';
    styles.select.padding = '0.25rem';
    styles.button.fontSize = '0.75rem';
    styles.label.fontSize = '0.75rem';
  } else {
    styles.container.padding = '10px 500px 0px 500px';
    styles.input.padding = '0.5rem';
    styles.textarea.padding = '0.5rem';
    styles.select.padding = '0.5rem';
    styles.form.width='50vw'
    styles.button.fontSize = '0.875rem';
    styles.label.fontSize = '0.875rem';
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Job Application Form</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Text as="p" style={styles.label}>Job Title</Text>
          <Input
            style={styles.input}
            name="jobTitle"
            placeholder="Enter Job Title"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Text as="p" style={styles.label}>Job Description</Text>
          <textarea
            name="jobDescription"
            placeholder="Enter Job Description"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            style={styles.textarea}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Text as="p" style={styles.label}>Experience Level</Text>
          <select
            value={experienceLevel}
            onChange={(e) => setExperienceLevel(e.target.value)}
            style={styles.select}
          >
            <option value="" disabled>Select Experience Level</option>
            <option value="junior">Junior</option>
            <option value="mid">Mid</option>
            <option value="senior">Senior</option>
          </select>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Text as="p" style={styles.label}>Add Candidate</Text>
          <Input
            type="text"
            placeholder="Enter Candidate Email"
            value={candidates}
            onChange={(e) => setCandidates(e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Text as="p" style={styles.label}>End Date</Text>
          <DatePicker
            name="endDate"
            placeholder="Select a Date"
            value={endDate}
            onChange={(date) => setEndDate(date)}
            style={styles.select}
          />
        </div>

        {/* Error and Success messages */}
        {error && <div style={styles.errorMessage}>{error}</div>}
        {success && <div style={styles.successMessage}>{success}</div>}

        <Button
          type="submit"
          style={styles.button}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#0056b3'} // Darker shade on hover
          onMouseLeave={(e) => e.target.style.backgroundColor = '#007bff'} // Original shade on mouse leave
        >
          Send
        </Button>
      </form>
    </div>
  );
}
