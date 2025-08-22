import React from "react";
import { useNavigate, Link } from "react-router-dom";
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
  FaTicketAlt
} from "react-icons/fa";

const navItems = [
  { label: "default", path: "/", icon: <FaHome /> },
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
  { label: "Land Measurement Converter", path: "/landmeasurement", icon: <FaRulerCombined /> },
  { label: "clock", path: "/clock", icon: <FaClock /> },
  { label: "Solar System Explorer", path: "/solar", icon: <FaGlobe /> },
  { label: "Vocab Match Game", path: "/vocabmatch", icon: <FaPuzzlePiece /> },
  { label: "Memory Match Game", path: "/memorymatch", icon: <FaBrain />},
  { label: "Time Calculator", path: "/timecalculator", icon: <FaClock /> },
  { label: "Dictionary", path: "/dictionary", icon: <FaBookOpen /> },
  { label: "geminibhAI", path: "/geminibhAI", icon: <FaBrain /> },
  { label: "Fifteen Puzzle", path: "/fifteenpuzzle", icon: <FaPuzzlePiece /> },
  { label: "Metro Ticket Generator", path: "/metroticket", icon: <FaTicketAlt /> },
  { label: "Project Details", path: "/projectdetails", icon: <FaInfoCircle /> }
];

const Sidebar = ({ showSidebar }) => {
  const navigate = useNavigate();

  return (
    <aside className={`h-screen w-72 bg-gray-900 flex flex-col px-6 py-8 shadow-2xl border-r border-gray-800 fixed top-0 left-0 z-40 overflow-y-auto hide-scrollbar transform transition-transform duration-300 ease-in-out ${showSidebar ? 'translate-x-0' : '-translate-x-full'}`}>
      {/* Logo */}
      <div
        className="flex items-center justify-center mb-10 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img
          src="https://github.com/kartavyam150.png"
          alt="Logo"
          className="w-16 h-16 rounded-full border-4 border-purple-500 shadow-lg transform transition-transform duration-300 hover:scale-110"
        />
      </div>
      {/* Sidebar Title */}
      <div className="mb-10 text-center">
        <span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 tracking-wider">
          Quick Access
        </span>
      </div>
      {/* Navigation Items */}
      <ul className="flex flex-col gap-2 flex-grow">
        {navItems.map((item) => (
          <li
            key={item.path}
            onClick={() => navigate(item.path)}
            className="flex items-center gap-4 px-5 py-3 rounded-xl cursor-pointer text-gray-300 hover:bg-gray-800 hover:text-blue-400 transition-all duration-200 font-medium text-base group relative overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 transition-opacity duration-200 group-hover:opacity-20"></span>
            <span className="text-2xl text-blue-400 group-hover:text-purple-400 transition-colors duration-200 relative z-10">
              {item.icon}
            </span>
            <span className="relative z-10">{item.label}</span>
          </li>
        ))}
      </ul>
      {/* User Profile */}
      <Link
        to="/portfolio"
        className="mt-auto flex items-center gap-4 px-5 py-4 bg-gray-800 rounded-xl mb-4 hover:bg-gray-700 transition-all duration-200 cursor-pointer shadow-md"
      >
        <img
          src="https://github.com/kartavyam150.png"
          alt="User"
          className="w-11 h-11 rounded-full border-3 border-blue-400 shadow-sm"
        />
        <span className="text-gray-100 font-semibold text-lg">Kartavya Mahajan</span>
      </Link>
      <div className="text-sm text-gray-500 text-center pb-4">
        © {new Date().getFullYear()} Kartavya Mahajan
      </div>
    </aside>
  );
};

export default Sidebar;
