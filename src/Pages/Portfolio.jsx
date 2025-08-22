import React from "react";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";
import { SiPostman } from "react-icons/si";
import styles from "./Portfolio.module.css";

const projects = [
  { title: "HelloWorld", desc: "Displays a greeting and demonstrates state and events.", link: "/" },
  { title: "Counter", desc: "A simple counter to increment and decrement numbers.", link: "/counter" },
  { title: "UserList", desc: "Shows a list of users.", link: "/userlist" },
  { title: "UserTable", desc: "Displays users in a table format.", link: "/usertable" },
  { title: "Hooks", desc: "Demonstrates React hooks with a live input example.", link: "/hooks" },
  { title: "CurtainShow", desc: "A curtain animation effect.", link: "/curtains" },
  { title: "NumberToIndianWords", desc: "Converts numbers to Indian words.", link: "/numtowords" },
  { title: "AudioToWords", desc: "Converts audio input to text.", link: "/audiotowords" },
  { title: "Progress Tracker", desc: "A progress tracker component.", link: "/progress" },
  { title: "Holi Splash", desc: "A fun Holi splash animation with balloons and water waves.", link: "/holi" },
  { title: "Random Letter Splash", desc: "Throw random letters with splash effects.", link: "/randomletter" }, // NEW
  { title: "Notepad", desc: "A rich text editor with save/load using local storage.", link: "/editableeditor" },
  { title: "Calculator", desc: "A basic calculator with arithmetic operations.", link: "/calculator" },
  { title: "TodoList", desc: "A simple todo list application with add/remove functionality.", link: "/todolist" },
  { title: "Product Listing", desc: "A list of products with add to cart functionality.", link: "/ProductListing" },
  // { title: "Cart", desc: "A shopping cart page with item management.", link: "/cart" },
  { title: "Material You New Tab", desc: "A new tab page styled with Material You design.", link: "/newtab" },
  { title: "Tic Tac Toe", desc: "A classic Tic Tac Toe game (2-player & vs Computer).", link: "/tictactoe" }, // UPDATED
  { title: "Weather Widget", desc: "A widget to display Real-Time weather information.", link: "/weather" },
  { title: "UserForm", desc: "A form to add or edit user details.", link: "/userform" },
  { title: "Contact", desc: "A contact form page with EmailJS integration.", link: "/contact" }, // UPDATED
  { title: "Shayari", desc: "A Shayari (poetry) display component.", link: "/shayari" },
  // { title: "Header", desc: "A header/navigation bar component.", link: "/header" },
  { title: "ImageToText", desc: "Extracts text from images.", link: "/imagetotext" },
  { title: "Morse Code Converter", desc: "Convert text to Morse code and vice versa, with clipboard support.", link: "/morse" }, // UPDATED
  { title: "Land Measurement Converter", desc: "Convert and compare different land measurement units.", link: "/landmeasurement" },
  { title: "Clock Display", desc: "A digital clock component.", link: "/clock" }, // NEW
  { title: "Solar System Explorer", desc: "Explore planets and facts about the solar system.", link: "/solar" }, // NEW
  { title: "Dictionary", desc: "Get English and Hindi meanings for words.", link: "/dictionary" }, // NEW
  { title: "AI Assistant (Gemini)", desc: "Chat with Gemini AI using your own backend.", link: "/geminibhAI" }, // NEW
  // { title: "Random Letter Splash", desc: "Throw random letters with splash effects.", link: "/randomletter" }, // NEW
  { title: "Vocab Match Game", desc: "Match vocabulary words with their meanings.", link: "/vocabmatch" }, // NEW
  { title: "Memory Match Game", desc: "Classic memory card matching game.", link: "/memoryMatch" }, // NEW
  
  // { title: "Progress Tracker Page", desc: "Track your progress visually.", link: "/progresstrack" }, // NEW
];

const Portfolio = () => (
  <div className={styles.bg}>
    <div className={styles.container}>
      <div className={styles.header}>
        <img
          src="https://github.com/kartavyam150.png"
          alt="Your Avatar"
          className={styles.avatar}
        />
        <h1>Kartavya Mahajan</h1>
        <div style={{ fontFamily: "monospace", fontSize: "1.1rem", margin: "8px 0", color: "#457b9d" }}>
          Morse Code: <span>-.- .- .-. - .- ...- -.-- .- <br /> -- .- .... .- .--- .- -. </span>
        </div>
        <p className={styles.role}>Project Developer & React Enthusiast</p>
        <p className={styles.bio}>
          I build interactive, modern web apps with React.<br />
          Passionate about UI/UX, animation, and making ideas come alive!
        </p>
        <div className={styles.socials}>
          <a
            href="https://github.com/kartavyam150"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
          >
            <FaGithub size={28} />
          </a>
          <a
            href="https://linkedin.com/in/kartmmhjn312"
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn"
          >
            <FaLinkedin size={28} />
          </a>
          <a
            href="https://x.com/kartmmhjn312"
            target="_blank"
            rel="noopener noreferrer"
            title="Twitter-X"
          >
            <FaTwitter size={28} />
          </a>
          <a
            href="https://instagram.com/kartmmhjn312"
            target="_blank"
            rel="noopener noreferrer"
            title="Instagram"
          >
            <FaInstagram size={28} />
          </a>
          <a
            href="https://postman.com/kartmmhjn312"
            target="_blank"
            rel="noopener noreferrer"
            title="Postman"
          >
            <SiPostman size={28} />
          </a>
        </div>
      </div>
      <h2 className={styles.sectionTitle}>Featured Projects</h2>
      <div className={styles.projects}>
        {projects.map((p, i) => (
          <div className={styles.projectCard} key={i}>
            <h3>{p.title}</h3>
            <p>{p.desc}</p>
            <a href={p.link} className={styles.projectLink}>View</a>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Portfolio;