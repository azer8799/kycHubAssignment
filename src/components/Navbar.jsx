import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav>
      <div className="logo-container">
        <span role="img" aria-label="logo" className="logo">
          🛍️
        </span>
        <span className="logo-text">ProductCompare</span>
      </div>
      <div className="user-profile">
        <span role="img" aria-label="user" className="profile-pic">
          User 👤
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
