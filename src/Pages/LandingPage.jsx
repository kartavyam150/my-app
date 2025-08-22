import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <header className="landing-header">
        <nav className="landing-nav">
          <div className="logo">MyApp</div>
          <ul className="nav-links">
            <li onClick={() => navigate("/about")}>About</li>
            {/* <li onClick={() => navigate("/features")}>Features</li> */}
            <li onClick={() => navigate("/contact")}>Contact</li>
            <li onClick={() => navigate("/userform")}>Login</li>
          </ul>
        </nav>
      </header>

      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to MyApp</h1>
          <p>Your one-stop solution to manage everything.</p>
          <button onClick={() => navigate("/curtains")}>Get Started</button>
        </div>
      </section>

      <section className="features-section">
        <h2>Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Fast &amp; Reliable</h3>
            <p>Experience lightning-fast performance with our app.</p>
          </div>
          <div className="feature-card">
            <h3>Easy to Use</h3>
            <p>An intuitive interface simplifies your daily tasks.</p>
          </div>
          <div className="feature-card">
            <h3>Secure</h3>
            <p>Your data is safe with state-of-the-art security.</p>
          </div>
        </div>
      </section>

      <footer className="landing-footer">
        <p>&copy; 2025 MyApp. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;