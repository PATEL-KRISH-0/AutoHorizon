import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserProvider"; // Adjust the import path as needed

const Nav = () => {
  // Theme toggle state
  const [isDark, setIsDark] = useState(localStorage.getItem("theme") === "dark");

  // Use user context to get user data and authentication status
  const { user, isLoggedIn, loading } = useContext(UserContext);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <nav>
      <div className="logo">
        <i className="ri-steering-2-line"></i>
        <span>AutoHorizon</span>
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/ContectUs">Contact Us</Link>
        {loading ? null : isLoggedIn ? (
          <>
            <Link to="/Profile">Profile {user && user.name ? `(${user.name})` : ""}</Link>
            <Link to="/normal-cars">Normal Cars</Link>
            <Link to="/auction-cars">Auction Cars</Link>
            <Link to="/Logout">Logout</Link>
          </>
        ) : (
          <>
            <Link to="/Signup">Sign Up</Link>
            <Link to="/Login">Login</Link>
          </>
        )}

        <button
          className="theme-toggle"
          id="theme-toggle"
          onClick={() => setIsDark(!isDark)}
        >
          <i className={isDark ? "ri-moon-line" : "ri-sun-line"}></i>
        </button>
      </div>
    </nav>
  );
};

export default Nav;
