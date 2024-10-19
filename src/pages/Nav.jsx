import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from '../api/api';
import './Navbar.css'; // Make sure to create this CSS file

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu toggle
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleLogout = async () => {
    try {
      const response = await fetch(`${BASE_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
  
      console.log('Response:', response); // Log response for debugging
  
      if (!response.ok) {
        const errorMessage = await response.text(); // Get error message from response
        throw new Error(`Logout failed: ${errorMessage}`);
      }
  
      localStorage.removeItem("token");
      navigate("/signin");
    } catch (error) {
      console.error('Error during logout:', error.message); // Log a more informative error
    }
  };
  
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <img
          src="https://res.cloudinary.com/dxgj7zw2w/image/upload/v1729309618/img_header_logo_mulonf.png"
          alt="Header Logo"
          className="logo"
        />
      </Link>

      <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <span className={`bar ${isMenuOpen ? 'toggle' : ''}`}></span>
        <span className={`bar ${isMenuOpen ? 'toggle' : ''}`}></span>
        <span className={`bar ${isMenuOpen ? 'toggle' : ''}`}></span>
      </button>

      <ul className={`nav-list ${isMenuOpen ? 'active' : ''}`}>
        <li>
          <Link to="/" className="nav-link">Home</Link>
        </li>
        {!isLoggedIn && (
          <>
            <li>
              <Link to="/signin" className="nav-link">Sign In</Link>
            </li>
            <li>
              <Link to="/signup" className="nav-link">Sign Up</Link>
            </li>
            <li>
          <Link to="/contact" className="nav-link">Contact</Link>
        </li>
          </>
        )}
        {isLoggedIn && (
          <>
            <li>
              <Link to="/interview" className="nav-link">Create Interview</Link>
            </li>
            <li>
              <Link to="/jobpost" className="nav-link">Create Job</Link>
            </li>
            <li>
              <Link to="/jobalert" className="nav-link">Send Job Alert</Link>
            </li>
        <li>
          <Link to="/contact" className="nav-link">Contact</Link>
        </li>
            <li>
              <button onClick={handleLogout} className="logout-button">Logout</button>
            </li>
          </>
        )}
        
      </ul>
    </nav>
  );
};

export default Navbar;
