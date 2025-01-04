// NavigationBar.js
import React from 'react';
import { Link } from 'react-router-dom';

const NavigationBar = ({ onLogout }) => {
  return (
    <nav className="navigationBar">
      <Link to="/">Home</Link>
      <span onClick={onLogout}>Logout</span>
    </nav>
  );
};

export default NavigationBar;
