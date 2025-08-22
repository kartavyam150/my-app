import React from 'react';
import './ProjectDetails.css'; // Assuming a CSS file for styling

const ProjectDetails = () => {
  return (
    <div className="project-details-container">
      <h1>Project Overview: My React App</h1>

      <section className="project-section">
        <h2>Introduction</h2>
        <p>
          This is a comprehensive React application developed to showcase various functionalities,
          components, and pages. It serves as a versatile platform demonstrating modern web development
          practices using React.
        </p>
      </section>

      <section className="project-section">
        <h2>Key Features</h2>
        <ul>
          <li><strong>Modular Component Design:</strong> The application is built with reusable and
            modular React components, promoting maintainability and scalability.</li>
          <li><strong>Diverse Functionalities:</strong> Includes a wide range of features such as
            interactive games (TicTacToe, Memory Match, Fifteen Puzzle), utility tools (Clock Display,
            Land Measurement Converter, Morse Code Converter, Number to Indian Words), and
            specialized pages (Cart Page, Contact Page, Portfolio).</li>
          <li><strong>User Interface &amp; Experience:</strong> Focuses on a responsive and intuitive
            user interface, with components like MaterialYouNewTab and custom CSS for enhanced aesthetics.</li>
          <li><strong>Data Handling &amp; Integration:</strong> Demonstrates basic data handling,
            including local JSON data (vocab_questions.json) and potential for API integrations (WeatherWidget).</li>
          <li><strong>Navigation &amp; Routing:</strong> Implements navigation through various pages
            using a dedicated navbar component.</li>
          <li><strong>Progress Tracking:</strong> Features a progress tracker component to monitor
            user activities or task completion.</li>
          <li><strong>User Management:</strong> Includes components for user forms and lists,
            suggesting capabilities for user data management.</li>
        </ul>
      </section>

      <section className="project-section">
        <h2>Technologies Used</h2>
        <ul>
          <li><strong>React:</strong> The core JavaScript library for building user interfaces.</li>
          <li><strong>Vite:</strong> A fast build tool that provides a quicker development experience for web projects.</li>
          <li><strong>CSS Modules / Tailwind CSS:</strong> For scoped and utility-first styling, ensuring a clean and maintainable stylesheet.</li>
          <li><strong>JavaScript (ES6+):</strong> For application logic and interactivity.</li>
          <li><strong>Capacitor:</strong> (Indicated by `capacitor.config.json` and `android/` directory) For building cross-platform native mobile apps with web technologies.</li>
          <li><strong>ESLint:</strong> For code quality and consistency.</li>
        </ul>
      </section>

      <section className="project-section">
        <h2>Project Structure Highlights</h2>
        <ul>
          <li><code>src/components/</code>: Contains all reusable UI components.</li>
          <li><code>src/Pages/</code>: Houses top-level page components that define different views of the application.</li>
          <li><code>public/</code>: For static assets.</li>
          <li><code>android/</code>: Native Android project files, indicating mobile app capabilities.</li>
        </ul>
      </section>

      <section className="project-section">
        <h2>How to Run</h2>
        <p>
          To run this project locally, ensure you have Node.js and npm/yarn installed.
          Navigate to the project root directory in your terminal and run:
        </p>
        <pre><code>npm install</code></pre>
        <p>Then, to start the development server:</p>
        <pre><code>npm run dev</code></pre>
        <p>
          The application will typically be available at <a href="http://localhost:5173" target="_blank" rel="noopener noreferrer">http://localhost:5173</a>
          or a similar port.
        </p>
      </section>
    </div>
  );
};

export default ProjectDetails;
