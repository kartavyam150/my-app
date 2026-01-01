// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css';
import styles from './App.module.css';
import HelloWorld from "./components/Helloworld";
import Counter from "./components/counter";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./Pages/Home";
import { ThemeProvider } from './contexts/ThemeContext';
import About from "./Pages/About";
import UserList from './components/user/UserList';
import UserTable from './components/user/userTable';
import Hooks from './components/Hooks';
import CurtainShow from './Pages/curtains';
import NumberToIndianWords from './components/NumberToIndianWords';
import AudioToWords from './components/AudioToWords';
import ProgressTrackerPage from './components/progressTracker/ProgressTrackerPage';
import HoliSplash from './components/Holi/HoliSplash';
import Sidebar from './components/Sidebar';
import { useState } from "react";
import Portfolio from './Pages/Portfolio';
import ProgressTracker from './components/progressTracker/progressTracker';
import EditableEditor from './components/EditableEditor';
import Calculator from './Pages/Calculator';
import TodoList from './Pages/TodoList';
import ProductListing from './components/ProductListing';
import Header from './components/Header';
import CartPage from './components/CartPage';
import MaterialYouNewTab from './components/MaterialYouNewTab';
import TicTacToe from './components/TicTacToe';
import NotFound from './components/NotFound';
import WeatherWidget from './components/WeatherWidget';
import { User } from 'lucide-react';
import UserFormPage from './components/user/UserFormPage';
import LandingPage from './Pages/LandingPage';
import ContactPage from './Pages/ContactPage';
import ShayariComponent from './components/ShayariComponent';
import ImgToTextPage from './Pages/ImgToTextPage';
import MorseCodeConverter from './components/MorseCodeConverter';
import LandMeasurementConverter from './components/LandMeasurementConverter';
import ClockDisplay from './components/ClockDisplay';
import SolarSystemExplorer from './components/SolarSystemExplorer';
import VocabMatchGame from './components/VocabMatchGame';
import MemoryMatchGame from './components/MemoryMatchGame';
import TimeCalculator from './components/TimeCalculator';
import Dictionary from './components/Dictionary';
import ChatComponent from './components/geminibhAI';
import FifteenPuzzle from './components/FifteenPuzzle';
import MetroTicketGenerator from './components/MetroTicketGenerator';
import ProjectDetails from './components/ProjectDetails';
import FinanceTrackerPage from './components/financeTracker/FinanceTrackerPage';
import TransactionHistoryPage from './components/financeTracker/TransactionHistoryPage';
import TypingTutor from './components/TypingTutor';
import SpeedTest from './components/SpeedTest';
import ShlokaForm from './components/ShlokaForm';
import NumberGuessingGame from './components/number-guessing-game/NumberGuessingGame';


function App() {
  const [showSidebar, setShowSidebar] = useState(true);
  const navigate = useNavigate();

  return (
    <ThemeProvider>
      <div className={styles.appWrapper}>
        <div className={styles.mainLayout}>
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className={styles.toggleButton}
            aria-label="Toggle Sidebar"
          >
            {showSidebar ? "✖" : "☰"}
          </button>
          <Sidebar showSidebar={showSidebar} />
          <div className={`${styles.content} ${showSidebar ? styles.withSidebar : ''}`}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/hello" element={<HelloWorld />} />
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/userlist" element={<UserList />} />
              <Route path="/usertable" element={<UserTable />} />
              <Route path="/counter" element={<Counter />} />
              <Route path="/hooks" element={<Hooks />} />
              <Route path="/curtains" element={<CurtainShow />} />
              <Route path="/numtowords" element={<NumberToIndianWords />} />
              <Route path="/audiotowords" element={<AudioToWords />} />
              <Route path="/progress" element={<ProgressTrackerPage />} />
              <Route path="/holi" element={<HoliSplash />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/progresstrack" element={<ProgressTracker />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/editableeditor" element={<EditableEditor />} />
              <Route path="/calculator" element={<Calculator />} />
              <Route path="/todolist" element={<TodoList />} />
              <Route path="/header" element={<Header />} />
              <Route path="/ProductListing" element={<ProductListing />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/newtab" element={<MaterialYouNewTab />} />
              <Route path="/tictactoe" element={<TicTacToe />} />
              <Route path="/weather" element={<WeatherWidget />} />
              <Route path="/userform" element={<UserFormPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/shayari" element={<ShayariComponent />} />
              <Route path='/imagetotext' element={<ImgToTextPage />} />
              <Route path='/morse' element={<MorseCodeConverter />} />
              <Route path='/landmeasurement' element={<LandMeasurementConverter />} />
              <Route path="/clock" element={<ClockDisplay />} />
              <Route path="/solar" element={<SolarSystemExplorer />} />
              <Route path="/vocabmatch" element={<VocabMatchGame />} />
              <Route path="/memoryMatch" element={<MemoryMatchGame />} />
              <Route path="/timeCalculator" element={<TimeCalculator />} />
              <Route path="/dictionary" element={<Dictionary />} />
              <Route path="/geminibhAI" element={<ChatComponent />} />
              <Route path="/fifteenpuzzle" element={<FifteenPuzzle />} />
              <Route path="/metroticket" element={<MetroTicketGenerator />} />
              <Route path="/projectdetails" element={<ProjectDetails />} />
              <Route path="/finance-tracker" element={<FinanceTrackerPage />} />
              <Route path="/finance-tracker/history" element={<TransactionHistoryPage />} />
              <Route path="/typing-tutor" element={<TypingTutor />} />
              <Route path="/speed-test" element={<SpeedTest />} />
              <Route path="/shloka" element={<ShlokaForm />} />
              <Route path="/number-guessing" element={<NumberGuessingGame />} />
            </Routes>
          </div>
        </div>
        <footer className={styles.footer}>
          <span
            onClick={() => navigate("/about")}
            className="text-blue-400 hover:text-blue-300 transition-colors duration-200 font-bold cursor-pointer"
          >
            © {new Date().getFullYear()}
          </span>
          <span
            onClick={() => navigate("/Portfolio")}
            className="text-purple-400 hover:text-purple-300 transition-colors duration-200 font-bold cursor-pointer ml-2"
          >
            kartmmhjn312
          </span>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App
