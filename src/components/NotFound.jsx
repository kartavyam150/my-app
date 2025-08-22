import React from 'react';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="notfound-container">
      <div className="notfound-content">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
          alt="React Logo"
          className="notfound-logo animate-logo"
        />
        <h1 className="notfound-title">404</h1>
        <p className="notfound-message">Sorry, this page is not available.</p>
      </div>
    </div>
  );
};

export default NotFound;