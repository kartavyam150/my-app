import React from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import {
  FaHome,
  FaInfoCircle,
  FaUsers,
  FaCalculator,
  FaMagic,
  FaSortNumericDown,
  FaHeadphones,
  FaChartBar,
  FaTable,
  FaPalette,
  FaTint,
  FaFolderOpen,
  FaRegStickyNote,
  FaListUl,
  FaShoppingBag,
  FaShoppingCart,
  FaRegWindowMaximize,
  FaGamepad,
  FaCloudSun,
  FaGlobe,
  FaCode,
  FaRulerCombined,
  FaClock,
  FaPuzzlePiece,
  FaBrain,
  FaFeatherAlt,
  FaBookOpen,
  FaFont,
  FaTicketAlt,
  FaDollarSign,
  FaWifi,
  FaSun,
  FaMoon
} from "react-icons/fa";

const navItems = [
  { label: "Hello", path: "/hello", icon: <FaGlobe /> },
  { label: "Home", path: "/home", icon: <FaHome /> },
  { label: "About", path: "/about", icon: <FaInfoCircle /> },
  { label: "UserList", path: "/userlist", icon: <FaUsers /> },
  { label: "Counter", path: "/counter", icon: <FaCalculator /> },
  { label: "Hooks", path: "/hooks", icon: <FaMagic /> },
  { label: "Number to Words", path: "/numtowords", icon: <FaSortNumericDown /> },
  { label: "Audio to Words", path: "/audiotowords", icon: <FaHeadphones /> },
  { label: "Image to Text", path: "/imagetotext", icon: <FaRegWindowMaximize /> },
  { label: "Progress Tracker", path: "/progress", icon: <FaChartBar /> },
  { label: "User Table", path: "/usertable", icon: <FaTable /> },
  { label: "Curtains", path: "/curtains", icon: <FaPalette /> },
  { label: "Holi Splash", path: "/holi", icon: <FaTint /> },
  { label: "Portfolio", path: "/portfolio", icon: <FaFolderOpen /> },
  { label: "Notepad", path: "/editableeditor", icon: <FaRegStickyNote /> },
  { label: "Calculator", path: "/calculator", icon: <FaCalculator /> },
  { label: "Todo List", path: "/todolist", icon: <FaListUl /> },
  { label: "Product Listing", path: "/ProductListing", icon: <FaShoppingBag /> },
  { label: "Header", path: "/header", icon: <FaHome /> },
  { label: "Cart", path: "/cart", icon: <FaShoppingCart /> },
  { label: "New Tab", path: "/newtab", icon: <FaRegWindowMaximize /> },
  { label: "Tic Tac Toe", path: "/tictactoe", icon: <FaGamepad /> },
  { label: "Weather", path: "/weather", icon: <FaCloudSun /> },
  { label: "User Form", path: "/userform", icon: <FaUsers /> },
  { label: "Contact", path: "/contact", icon: <FaUsers /> },
  { label: "Shayari", path: "/shayari", icon: <FaFeatherAlt /> },
  { label: "Morse Code Converter", path: "/morse", icon: <FaCode /> },
  { label: "Land Measurement", path: "/landmeasurement", icon: <FaRulerCombined /> },
  { label: "Clock", path: "/clock", icon: <FaClock /> },
  { label: "Solar System", path: "/solar", icon: <FaGlobe /> },
  { label: "Vocab Match", path: "/vocabmatch", icon: <FaPuzzlePiece /> },
  { label: "Memory Match", path: "/memorymatch", icon: <FaBrain /> },
  { label: "Time Calculator", path: "/timecalculator", icon: <FaClock /> },
  { label: "Dictionary", path: "/dictionary", icon: <FaBookOpen /> },
  { label: "Gemini AI", path: "/geminibhAI", icon: <FaBrain /> },
  { label: "15 Puzzle", path: "/fifteenpuzzle", icon: <FaPuzzlePiece /> },
  { label: "Ticket Gen", path: "/metroticket", icon: <FaTicketAlt /> },
  { label: "Project Details", path: "/projectdetails", icon: <FaInfoCircle /> },
  { label: "Finance Tracker", path: "/finance-tracker", icon: <FaDollarSign /> },
  { label: "Typing Tutor", path: "/typing-tutor", icon: <FaCode /> },
  { label: "Speed Test", path: "/speed-test", icon: <FaWifi /> },
  { label: "Shlokas", path: "/shloka", icon: <FaBookOpen /> },
  { label: "Number Guessing", path: "/number-guessing", icon: <FaGamepad /> },
];

const Sidebar = ({ showSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, updateTheme } = useTheme();

  const toggleTheme = () => {
    updateTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-40 w-72 
        bg-slate-950/90 backdrop-blur-xl border-r border-slate-800 shadow-2xl
        transform transition-transform duration-300 ease-cubic-out
        flex flex-col
        ${showSidebar ? 'translate-x-0' : '-translate-x-full'}
      `}
    >
      {/* Header Section */}
      <div className="flex flex-col items-center pt-8 pb-6 px-4 border-b border-slate-800/50">

        {/* Logo / Profile */}
        <div
          className="relative group cursor-pointer mb-6"
          onClick={() => navigate("/")}
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
          <img
            src="https://github.com/kartavyam150.png"
            alt="Logo"
            className="relative w-16 h-16 rounded-full border-2 border-slate-800 group-hover:border-slate-600 transition-colors"
          />
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-100 to-slate-400 tracking-tight mb-6">
          My Workspace
        </h2>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="
            flex items-center gap-3 px-4 py-2 w-full rounded-lg 
            bg-slate-900 border border-slate-800 
            text-slate-400 text-sm font-medium
            hover:bg-slate-800 hover:text-cyan-400 hover:border-slate-700
            transition-all duration-200
          "
        >
          {theme === 'light' ? <FaMoon className="text-cyan-400" /> : <FaSun className="text-amber-400" />}
          <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
        </button>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <div
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`
                group flex items-center gap-3 px-4 py-2.5 rounded-lg cursor-pointer transition-all duration-200
                ${isActive
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-slate-100 hover:border-slate-800 border border-transparent'
                }
              `}
            >
              <span className={`text-lg transition-colors ${isActive ? 'text-cyan-400' : 'text-slate-500 group-hover:text-cyan-400'}`}>
                {item.icon}
              </span>
              <span className="font-medium text-sm tracking-wide">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Footer / Profile Link */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/50">
        <Link
          to="/portfolio"
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-900 transition-colors group"
        >
          <img
            src="https://github.com/kartavyam150.png"
            alt="User"
            className="w-8 h-8 rounded-full border border-slate-700 group-hover:border-purple-500 transition-colors"
          />
          <div className="flex flex-col">
            <span className="text-slate-200 text-sm font-medium group-hover:text-purple-400 transition-colors">Kartavya M.</span>
            <span className="text-slate-600 text-xs">Full Stack Dev</span>
          </div>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
