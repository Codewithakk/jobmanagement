import React from "react";
import { Link } from "react-router-dom";

const User = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Homepage</h1>
      <ul style={styles.list}>
        <li style={styles.listItem}>
          <Link to="/signup" style={styles.link}>Signup</Link>
        </li>
        <li style={styles.listItem}>
          <Link to="/signin" style={styles.link}>Signin</Link>
        </li>
        <li style={styles.listItem}>
          <Link to="/interview" style={styles.link}>Create Interview</Link>
        </li>
        <li style={styles.listItem}>
          <Link to="/jobpost" style={styles.link}>Create Job</Link>
        </li>
        <li style={styles.listItem}>
          <Link to="/contact" style={styles.link}>Contact</Link>
        </li>
      </ul>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    padding: "20px",
    backgroundColor: "#232323",
    color: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: "48px",
    marginBottom: "20px",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  listItem: {
    marginBottom: "10px",
  },
  link: {
    color: "#87CEFA",
    textDecoration: "none",
    fontSize: "18px",
  },
};

export default User;
