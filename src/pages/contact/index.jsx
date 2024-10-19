import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from '../../api/api';
import Home from '../Nav';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false); // Hover state for button

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let formErrors = {};
    let valid = true;

    if (!formData.name.trim()) {
      formErrors.name = "Name is required";
      valid = false;
    }
    if (!formData.email.trim()) {
      formErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = "Email is invalid";
      valid = false;
    }
    if (!formData.subject.trim()) {
      formErrors.subject = "Subject is required";
      valid = false;
    }
    if (!formData.message.trim()) {
      formErrors.message = "Message is required";
      valid = false;
    }

    setErrors(formErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      try {
        await axios.post(`${BASE_URL}/contact`, formData);
        setSubmitted(true);
        setErrors({});
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } catch (err) {
        setErrors({ form: "Error submitting contact form. Please try again." });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Home />
      <div style={styles.content}>
        <h1 style={styles.heading}>Contact Us</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          {errors.form && <p style={styles.error}>{errors.form}</p>}
          <div style={styles.formGroup}>
            <label htmlFor="name" style={styles.label}>Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={styles.input}
            />
            {errors.name && <p style={styles.error}>{errors.name}</p>}
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
            />
            {errors.email && <p style={styles.error}>{errors.email}</p>}
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="subject" style={styles.label}>Subject:</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              style={styles.input}
            />
            {errors.subject && <p style={styles.error}>{errors.subject}</p>}
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="message" style={styles.label}>Message:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              style={styles.textarea}
            ></textarea>
            {errors.message && <p style={styles.error}>{errors.message}</p>}
          </div>
          <button
            type="submit"
            style={{
              ...styles.button,
              ...(isHovered ? styles.buttonHover : {}),
            }}
            disabled={loading}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
          {submitted && <p style={styles.success}>Thank you for contacting us!</p>}
        </form>
      </div>
    </>
  );
};

const styles = {

  content: {
    maxWidth: "600px", // Set a maximum width for better appearance
    width: "100%", // Full width on small screens
    padding: "20px",
    backgroundColor: "#ffffff",
    margin: "20px auto", // Center the content
  },

  heading: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "32px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  formGroup: {
    marginBottom: "15px",
  },
  label: {
    marginBottom: "5px",
    fontSize: "16px",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "10px", // Adjusted padding for medium size
    fontSize: "14px", // Adjusted font size for medium appearance
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  textarea: {
    width: "100%",
    padding: "10px", // Adjusted padding for medium size
    fontSize: "14px", // Adjusted font size for medium appearance
    borderRadius: "4px",
    border: "1px solid #ccc",
    minHeight: "100px",
  },
  button: {
    padding: "10px 20px", // Adjusted padding for better appearance
    fontSize: "16px", // Consistent font size
    color: "#fff",
    backgroundColor: "blue",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s, transform 0.2s", // Transition effects
  },
  buttonHover: {
    backgroundColor: "#0056b3", // Darker shade on hover
    transform: "scale(1.05)", // Slight scale effect on hover
  },
  error: {
    color: "red",
    fontSize: "14px",
    marginTop: "5px",
  },
  success: {
    color: "green",
    marginTop: "10px",
    textAlign: "center",
  },
};

export default ContactPage;
