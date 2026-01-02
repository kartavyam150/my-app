import React from 'react';

const ProjectDetails = () => {
  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100 font-sans p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">

        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
            Project Overview: My React App
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            A comprehensive showcase of modern React development capabilities.
          </p>
        </div>

        {/* Introduction */}
        <section className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-2xl p-6 md:p-8 hover:border-cyan-500/30 transition-colors">
          <h2 className="text-2xl font-semibold text-cyan-400 mb-4 flex items-center gap-2">
            Introduction
          </h2>
          <p className="text-slate-300 leading-relaxed">
            This is a comprehensive React application developed to showcase various functionalities,
            components, and pages. It serves as a versatile platform demonstrating modern web development
            practices using React.
          </p>
        </section>

        {/* Key Features */}
        <section className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-2xl p-6 md:p-8 hover:border-purple-500/30 transition-colors">
          <h2 className="text-2xl font-semibold text-purple-400 mb-4">Key Features</h2>
          <ul className="space-y-3 text-slate-300">
            <li><strong className="text-slate-100">Modular Component Design:</strong> The application is built with reusable and
              modular React components, promoting maintainability and scalability.</li>
            <li><strong className="text-slate-100">Diverse Functionalities:</strong> Includes a wide range of features such as
              interactive games (TicTacToe, Memory Match, Fifteen Puzzle), utility tools (Clock Display,
              Land Measurement Converter, Morse Code Converter, Number to Indian Words), and
              specialized pages (Cart Page, Contact Page, Portfolio).</li>
            <li><strong className="text-slate-100">User Interface & Experience:</strong> Focuses on a responsive and intuitive
              user interface, with components like MaterialYouNewTab and custom CSS for enhanced aesthetics.</li>
            <li><strong className="text-slate-100">Data Handling & Integration:</strong> Demonstrates basic data handling,
              including local JSON data (vocab_questions.json) and potential for API integrations (WeatherWidget).</li>
            <li><strong className="text-slate-100">Navigation & Routing:</strong> Implements navigation through various pages
              using a dedicated navbar component.</li>
            <li><strong className="text-slate-100">Progress Tracking:</strong> Features a progress tracker component to monitor
              user activities or task completion.</li>
            <li><strong className="text-slate-100">User Management:</strong> Includes components for user forms and lists,
              suggesting capabilities for user data management.</li>
          </ul>
        </section>

        {/* Technologies Used */}
        <section className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-2xl p-6 md:p-8 hover:border-cyan-500/30 transition-colors">
          <h2 className="text-2xl font-semibold text-cyan-400 mb-4">Technologies Used</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-300">
            <li className="bg-slate-950/50 p-3 rounded-lg border border-slate-800">
              <strong className="text-cyan-300 block mb-1">React</strong> The core JavaScript library.
            </li>
            <li className="bg-slate-950/50 p-3 rounded-lg border border-slate-800">
              <strong className="text-purple-300 block mb-1">Vite</strong> Fast build tool.
            </li>
            <li className="bg-slate-950/50 p-3 rounded-lg border border-slate-800">
              <strong className="text-cyan-300 block mb-1">Tailwind CSS</strong> Utility-first styling.
            </li>
            <li className="bg-slate-950/50 p-3 rounded-lg border border-slate-800">
              <strong className="text-yellow-300 block mb-1">JavaScript (ES6+)</strong> Application logic.
            </li>
            <li className="bg-slate-950/50 p-3 rounded-lg border border-slate-800">
              <strong className="text-blue-300 block mb-1">Capacitor</strong> Cross-platform native apps.
            </li>
            <li className="bg-slate-950/50 p-3 rounded-lg border border-slate-800">
              <strong className="text-purple-300 block mb-1">ESLint</strong> Code quality.
            </li>
          </ul>
        </section>

        {/* Project Structure */}
        <section className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-2xl p-6 md:p-8 hover:border-purple-500/30 transition-colors">
          <h2 className="text-2xl font-semibold text-purple-400 mb-4">Project Structure Highlights</h2>
          <ul className="space-y-3 font-mono text-sm text-slate-400">
            <li className="flex items-center gap-3">
              <span className="bg-slate-800 px-2 py-1 rounded text-cyan-400">src/components/</span>
              <span>Contains all reusable UI components.</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="bg-slate-800 px-2 py-1 rounded text-cyan-400">src/Pages/</span>
              <span>Top-level page components showing views.</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="bg-slate-800 px-2 py-1 rounded text-cyan-400">public/</span>
              <span>Static assets.</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="bg-slate-800 px-2 py-1 rounded text-cyan-400">android/</span>
              <span>Native Android project files.</span>
            </li>
          </ul>
        </section>

        {/* How to Run */}
        <section className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-2xl p-6 md:p-8 hover:border-cyan-500/30 transition-colors">
          <h2 className="text-2xl font-semibold text-cyan-400 mb-4">How to Run</h2>
          <div className="space-y-4 text-slate-300">
            <p>
              To run this project locally, ensure you have Node.js and npm/yarn installed.
              Navigate to the project root directory in your terminal and run:
            </p>
            <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 font-mono text-sm">
              <div className="flex items-center gap-2 mb-2 text-slate-500 select-none">
                <span className="w-3 h-3 rounded-full bg-red-500"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
              </div>
              <p className="text-green-400 break-all">npm install</p>
            </div>
            <p>Then, to start the development server:</p>
            <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 font-mono text-sm">
              <div className="flex items-center gap-2 mb-2 text-slate-500 select-none">
                <span className="w-3 h-3 rounded-full bg-red-500"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
              </div>
              <p className="text-green-400 break-all">npm run dev</p>
            </div>
            <p>
              The application will typically be available at <a href="http://localhost:5173" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-4">http://localhost:5173</a>.
            </p>
          </div>
        </section>

      </div>
    </div>
  );
};

export default ProjectDetails;
