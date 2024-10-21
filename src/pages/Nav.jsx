import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from '../api/api';
import './Navbar.css'; // Ensure you have this CSS file

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu toggle
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleLogout = async () => {
    try {
      const response = await fetch(`${BASE_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Logout failed: ${errorMessage}`);
      }

      localStorage.removeItem("token");
      navigate("/signin");
    } catch (error) {
      console.error('Error during logout:', error.message);
    }
  };

  const handleLinkClick = () => {
    // Close the menu after clicking a link in mobile view
    setIsMenuOpen(false);
  };

  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo" onClick={handleLinkClick}>
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
          <Link to="/" className="nav-link" onClick={handleLinkClick}>Home</Link>
        </li>
        {!isLoggedIn && (
          <>
            <li>
              <Link to="/signin" className="nav-link" onClick={handleLinkClick}>Sign In</Link>
            </li>
            <li>
              <Link to="/signup" className="nav-link" onClick={handleLinkClick}>Sign Up</Link>
            </li>
            <li>
              <Link to="/contact" className="nav-link" onClick={handleLinkClick}>Contact</Link>
            </li>
          </>
        )}
        {isLoggedIn && (
          <>
            <li>
              <Link to="/interview" className="nav-link" onClick={handleLinkClick}>Create Interview</Link>
            </li>
            <li>
              <Link to="/jobpost" className="nav-link" onClick={handleLinkClick}>Create Job</Link>
            </li>
            <li>
              <Link to="/jobalert" className="nav-link" onClick={handleLinkClick}>Send Job Alert</Link>
            </li>
            <li>
              <Link to="/contact" className="nav-link" onClick={handleLinkClick}>Contact</Link>
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
