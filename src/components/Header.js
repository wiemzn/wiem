import React from "react";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <img src="logo1.png" alt="Company Logo" className="company-logo" />
        <h1 className="company-name">Recognizer</h1>
      </div>
      <div className="header-right">
        <a href="#link1" className="header-link">Documentation</a>
        <a href="#link2" className="header-link">How It Work</a>
      </div>
    </header>
  );
}

export default Header;