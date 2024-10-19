import React from "react";
import Navbar from "./Nav"; // Adjust the import path as needed

const Home = () => {
  const styles = {
    container: {
      minHeight: "10vh", // Ensure the container takes up full height
      padding: "20px",
      backgroundColor: "#ffffff", // White background
      color: "#232323", // Dark text color for contrast
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      animation: "fadeIn 1s ease-in-out", // Fade-in animation
    },
    heading: {
      fontSize: "48px",
      margin: "20px 0",
      animation: "slideIn 0.5s forwards", // Slide-in animation
    },
    description: {
      fontSize: "20px",
      marginBottom: "30px",
      opacity: 0,
      animation: "fadeInUp 1s forwards 0.5s", // Delayed fade-in animation
    },
    exploreButton: {
      padding: "10px 20px",
      fontSize: "18px",
      color: "#ffffff",
      backgroundColor: "#ff6347",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      transition: "background-color 0.3s, transform 0.3s",
      outline: "none",
    },
  };

  return (
    <div style={styles.container}>
      <Navbar />
      <h1 style={styles.heading}>Welcome to Our Platform</h1>
      <p
        style={{
          ...styles.description,
          animation: "fadeInUp 1s forwards 0.5s", // Ensure the animation is applied
        }}
      >
        Your gateway to career opportunities and connections.
      </p>
      <button
        style={styles.exploreButton}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#ff4500"; // Darker shade on hover
          e.currentTarget.style.transform = "scale(1.05)"; // Slightly enlarge button
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#ff6347"; // Reset to original color
          e.currentTarget.style.transform = "scale(1)"; // Reset size
        }}
      >
        Explore More
      </button>
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          @keyframes slideIn {
            from {
              transform: translateY(-20px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Home;
