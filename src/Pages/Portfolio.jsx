import React from "react";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaReact, FaNodeJs, FaCss3Alt, FaHtml5 } from "react-icons/fa";
import { SiPostman, SiTailwindcss, SiJavascript, SiVite, SiMongodb } from "react-icons/si";

const projects = [
  { title: "Hello World", desc: "Interactive greeting component demonstrating state.", link: "/hello", tags: ["Basics"] },
  { title: "Counter", desc: "Simple increment/decrement counter app.", link: "/counter", tags: ["State"] },
  { title: "User List", desc: "Dynamic list of users utilizing array mapping.", link: "/userlist", tags: ["Data"] },
  { title: "User Table", desc: "Tabular display of user data with efficient rendering.", link: "/usertable", tags: ["UI"] },
  { title: "React Hooks", desc: "Showcase of various React hooks in action.", link: "/hooks", tags: ["Core"] },
  { title: "Number to Words", desc: "Convert numeric input into Indian numbering format text.", link: "/numtowords", tags: ["Utility"] },
  { title: "Audio to Words", desc: "Speech-to-text converter utilizing Web APIs.", link: "/audiotowords", tags: ["API"] },
  { title: "Image to Text", desc: "OCR utility to extract text from images.", link: "/imagetotext", tags: ["AI/ML"] },
  { title: "Progress Tracker", desc: "Visual tracking component for tasks/goals.", link: "/progress", tags: ["Productivity"] },
  { title: "Curtain Reveal", desc: "Interactive curtain animation effect.", link: "/curtains", tags: ["Animation"] },
  { title: "Holi Splash", desc: "Fun colorful splash animations.", link: "/holi", tags: ["Fun"] },
  { title: "Portfolio", desc: "This comprehensive showcase of my work.", link: "/portfolio", tags: ["Meta"] },
  { title: "Notepad", desc: "Rich text editor with local storage persistence.", link: "/editableeditor", tags: ["Tool"] },
  { title: "Calculator", desc: "Fully functional arithmetic calculator.", link: "/calculator", tags: ["Tool"] },
  { title: "Todo List", desc: "Task management app with CRUD operations.", link: "/todolist", tags: ["Productivity"] },
  { title: "E-Comm Product Listing", desc: "E-commerce style grid with filtering.", link: "/ProductListing", tags: ["E-com"] },

  { title: "New Tab App", desc: "Google-style 'New Tab' dashboard.", link: "/newtab", tags: ["UI"] },
  { title: "Tic Tac Toe", desc: "Classic game with 2-player and AI modes.", link: "/tictactoe", tags: ["Game"] },
  { title: "Weather Widget", desc: "Real-time weather updates via API.", link: "/weather", tags: ["API"] },
  { title: "User Form", desc: "Complex form handling with validation.", link: "/userform", tags: ["Forms"] },
  { title: "Contact Form", desc: "EmailJS integated contact form.", link: "/contact", tags: ["Network"] },
  { title: "Shayari", desc: "Poetry card display component.", link: "/shayari", tags: ["Content"] },
  { title: "Morse Converter", desc: "Bidirectional text-to-morse translator.", link: "/morse", tags: ["Utility"] },
  { title: "Land Converter", desc: "Unit conversion for land measurements.", link: "/landmeasurement", tags: ["Utility"] },
  { title: "Digital Clock", desc: "Live time display with styling.", link: "/clock", tags: ["Utility"] },
  { title: "Solar System", desc: "Interactive educational space explorer.", link: "/solar", tags: ["Edu"] },
  { title: "Vocab Match", desc: "Educational vocabulary matching game.", link: "/vocabmatch", tags: ["Game"] },
  { title: "Memory Match", desc: "Card flipping memory game.", link: "/memorymatch", tags: ["Game"] },
  { title: "Time Calculator", desc: "Time duration addition/subtraction tool.", link: "/timecalculator", tags: ["Tool"] },
  { title: "Dictionary", desc: "Word definition lookup tool.", link: "/dictionary", tags: ["API"] },
  { title: "Gemini AI", desc: "AI Chatbot interface powered by Google Gemini.", link: "/geminibhAI", tags: ["AI"] },
  { title: "15 Puzzle", desc: "Classic sliding tile logic puzzle.", link: "/fifteenpuzzle", tags: ["Game"] },
  { title: "Ticket Generator", desc: "Metro ticket booking simulation.", link: "/metroticket", tags: ["Simulation"] },

  { title: "Finance Tracker", desc: "Expense and income tracking dashboard.", link: "/finance-tracker", tags: ["Finance"] },
  { title: "Typing Tutor", desc: "Speed typing practice application.", link: "/typing-tutor", tags: ["Edu"] },
  { title: "Speed Test", desc: "Professional grade internet speed test.", link: "/speed-test", tags: ["Network"] },
  { title: "Shlokas", desc: "Spiritual wisdom cards.", link: "/shloka", tags: ["Content"] },
  { title: "Number Guessing", desc: "Logic game to guess the secret number.", link: "/number-guessing", tags: ["Game"] },
];

const skills = [
  { name: "React", icon: <FaReact className="text-cyan-400" /> },
  { name: "JavaScript", icon: <SiJavascript className="text-yellow-400" /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss className="text-cyan-300" /> },
  { name: "Node.js", icon: <FaNodeJs className="text-green-500" /> },
  { name: "HTML5", icon: <FaHtml5 className="text-orange-500" /> },
  { name: "CSS3", icon: <FaCss3Alt className="text-blue-500" /> },
  { name: "Vite", icon: <SiVite className="text-purple-400" /> },
  { name: "MongoDB", icon: <SiMongodb className="text-green-400" /> },
];

const Portfolio = () => (
  <div className="min-h-screen w-full bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500/30 overflow-x-hidden">

    {/* Background Gradient Mesh */}
    <div className="fixed inset-0 pointer-events-none z-0">
      <div className="absolute top-0 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]" />
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-20 w-80 h-80 bg-blue-500/10 rounded-full blur-[80px]" />
    </div>

    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

      {/* Hero Section */}
      <div className="flex flex-col items-center text-center mb-24 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="relative group mb-8">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full blur opacity-40 group-hover:opacity-100 transition duration-500"></div>
          <img
            src="https://github.com/kartavyam150.png"
            alt="Kartavya Mahajan"
            className="relative w-40 h-40 rounded-full border-4 border-slate-900 shadow-2xl"
          />
        </div>

        <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400 tracking-tight mb-4">
          Kartavya Mahajan
        </h1>

        <p className="text-xl md:text-2xl text-cyan-400 font-medium mb-6">
          Project Developer & React Enthusiast
        </p>

        <p className="max-w-2xl text-slate-400 text-lg leading-relaxed mb-8">
          Building interactive, pixel-perfect web experiences. <br className="hidden md:block" />
          Passionate about modern UI/UX, animations, and clean code.
        </p>

        {/* Morse Code (Kept as requested, stylized) */}
        <div className="font-mono text-xs md:text-sm text-slate-600 bg-slate-900/50 px-4 py-2 rounded-lg border border-slate-800/50 mb-8 backdrop-blur-sm">
          -.- .- .-. - .- ...- -.-- .- &nbsp; -- .- .... .- .--- .- -.
        </div>

        {/* Social Links */}
        <div className="flex gap-6">
          {[
            { Icon: FaGithub, href: "https://github.com/kartavyam150", color: "hover:text-white" },
            { Icon: FaLinkedin, href: "https://linkedin.com/in/kartmmhjn312", color: "hover:text-blue-400" },
            { Icon: FaTwitter, href: "https://x.com/kartmmhjn312", color: "hover:text-sky-400" },
            { Icon: FaInstagram, href: "https://instagram.com/kartmmhjn312", color: "hover:text-pink-500" },
            { Icon: SiPostman, href: "https://postman.com/kartmmhjn312", color: "hover:text-orange-500" },
          ].map(({ Icon, href, color }, i) => (
            <a
              key={i}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-slate-400 bg-slate-900/50 p-3 rounded-xl border border-slate-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/10 ${color}`}
            >
              <Icon size={24} />
            </a>
          ))}
        </div>
      </div>

      {/* Skills Section */}
      <div className="mb-24">
        <h2 className="text-3xl font-bold text-center mb-12 flex items-center justify-center gap-3">
          <span className="w-12 h-1 bg-gradient-to-r from-transparent to-cyan-500 rounded-full"></span>
          Tech Stack
          <span className="w-12 h-1 bg-gradient-to-l from-transparent to-cyan-500 rounded-full"></span>
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          {skills.map((skill, index) => (
            <div key={index} className="flex items-center gap-2 px-6 py-3 bg-slate-900/50 border border-slate-800 rounded-full text-slate-300 hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all duration-300 cursor-default">
              <span className="text-xl">{skill.icon}</span>
              <span className="font-medium">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div>
        <h2 className="text-3xl font-bold text-center mb-12">Featured Projects ({projects.length})</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {projects.map((project, index) => (
            <a
              key={index}
              href={project.link}
              className="group relative flex flex-col p-6 bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-2xl hover:bg-slate-800/60 hover:border-slate-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/5"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-slate-950/50 rounded-xl border border-slate-800 group-hover:border-cyan-500/20 transition-colors">
                  <span className="text-2xl">🚀</span>
                </div>
                <span className="text-xs font-semibold px-2 py-1 rounded bg-slate-800 text-slate-400 border border-slate-700 group-hover:text-cyan-400 group-hover:border-cyan-500/30 transition-colors">
                  {project.tags[0]}
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-100 mb-2 group-hover:text-cyan-400 transition-colors">
                {project.title}
              </h3>

              <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-grow">
                {project.desc}
              </p>

              <div className="flex items-center text-cyan-400 text-sm font-semibold opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                View Project <span className="ml-1">→</span>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-24 pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
        <p>© {new Date().getFullYear()} Kartavya Mahajan. Built with ❤️ and React.</p>
      </div>

    </div>
  </div>
);

export default Portfolio;