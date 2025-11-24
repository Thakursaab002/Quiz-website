import React from 'react';
import { Link } from 'react-router-dom';
import './Resources.css';

const Resources = () => {
  return (
    <div className="resources-container">
      <div className="resources-header">
        <Link to="/" className="back-button">← Back to Home</Link>
        <h1>Learning Resources</h1>
        <p>Access curated educational materials</p>
      </div>
      
      <div className="resources-content">
        <div className="resources-grid">
          <div className="resource-card">
            <h3>Documentation</h3>
            <p>Comprehensive guides and references</p>
            <button className="resource-btn">View</button>
          </div>
          <div className="resource-card">
            <h3>Tutorials</h3>
            <p>Step-by-step learning paths</p>
            <button className="resource-btn">View</button>
          </div>
          <div className="resource-card">
            <h3>Videos</h3>
            <p>Educational video content</p>
            <button className="resource-btn">View</button>
          </div>
          <div className="resource-card">
            <h3>Practice Exercises</h3>
            <p>Hands-on coding challenges</p>
            <button className="resource-btn">View</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;