import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../api/api';
import Home from '../Nav';

const Interview = () => {
  const [interviews, setInterviews] = useState([]);
  const [newInterview, setNewInterview] = useState({
    title: '',
    takenBy: '',
    date: '',
    time: '',
    email: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingInterviewId, setEditingInterviewId] = useState(null);

  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/jobs`);
      setInterviews(response.data);
    } catch (err) {
      console.error('Error fetching interviews:', err);
    }
  };

  const handleChange = (e) => {
    setNewInterview({
      ...newInterview,
      [e.target.name]: e.target.value,
    });
  };

  const createInterview = async () => {
    try {
      await axios.post(`${BASE_URL}/jobs/create`, newInterview);
      alert('Interview created successfully');
      resetForm();
      fetchInterviews();
    } catch (err) {
      alert('Error creating interview');
    }
  };

  const updateInterview = async () => {
    try {
      await axios.put(`${BASE_URL}/jobs/${editingInterviewId}`, newInterview);
      alert('Interview updated successfully');
      resetForm();
      setIsEditing(false);
      setEditingInterviewId(null);
      fetchInterviews();
    } catch (err) {
      alert('Error updating interview');
    }
  };

  const deleteInterview = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/jobs/${id}`);
      alert('Interview deleted successfully');
      fetchInterviews();
    } catch (err) {
      alert('Error deleting interview');
    }
  };

  const resetForm = () => {
    setNewInterview({ title: '', takenBy: '', date: '', time: '', email: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      updateInterview();
    } else {
      createInterview();
    }
  };

  const handleEdit = (interview) => {
    setNewInterview({
      title: interview.title,
      takenBy: interview.takenBy,
      date: interview.date,
      time: interview.time,
      email: interview.email,
    });
    setIsEditing(true);
    setEditingInterviewId(interview._id);
  };

  return (
    <div style={styles.container}>
      <Home />
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="title"
          placeholder="Interview Title"
          value={newInterview.title}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="text"
          name="takenBy"
          placeholder="Taken By"
          value={newInterview.takenBy}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="date"
          name="date"
          value={newInterview.date}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="time"
          name="time"
          value={newInterview.time}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newInterview.email}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.submitButton}>
          {isEditing ? 'Update Interview' : 'Create Interview'}
        </button>
      </form>

      <h2 style={styles.header}>Interviews</h2>
      {interviews.length === 0 ? (
        <p>No interviews scheduled yet.</p>
      ) : (
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>Title</th>
                <th style={styles.tableHeader}>Taken By</th>
                <th style={styles.tableHeader}>Date</th>
                <th style={styles.tableHeader}>Time</th>
                <th style={styles.tableHeader}>Email</th>
                <th style={styles.tableHeader}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {interviews.map((interview) => (
                <tr key={interview._id} style={styles.tableRow}>
                  <td style={styles.tableData}>{interview.title}</td>
                  <td style={styles.tableData}>{interview.takenBy}</td>
                  <td style={styles.tableData}>{new Date(interview.date).toLocaleDateString()}</td>
                  <td style={styles.tableData}>{interview.time}</td>
                  <td style={styles.tableData}>{interview.email}</td>
                  <td style={styles.tableData}>
                    <button style={styles.editButton} onClick={() => handleEdit(interview)}>
                      Edit
                    </button>
                    <button style={styles.deleteButton} onClick={() => deleteInterview(interview._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '90%',
    margin: '0 auto',
    padding: '10px',
    fontFamily: 'Arial, sans-serif',
    boxSizing: 'border-box',
  },
  header: {
    textAlign: 'center',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginBottom: '20px',
  },
  input: {
    padding: '12px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    transition: 'border-color 0.3s',
  },
  submitButton: {
    backgroundColor: 'blue',
    color: '#fff',
    padding: '12px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  tableContainer: {
    overflowX: 'auto', // Enable horizontal scrolling for the table
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  },
  tableHeader: {
    backgroundColor: '#f2f2f2',
    padding: '12px',
    textAlign: 'center',
    border: '1px solid #ddd',
  },
  tableRow: {
    transition: 'background-color 0.3s',
  },
  tableData: {
    padding: '12px',
    textAlign: 'center',
    border: '1px solid #ddd',
  },
  editButton: {
    padding: '6px 12px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '5px',
    transition: 'background-color 0.3s',
  },
  deleteButton: {
    padding: '6px 12px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};

export default Interview;
