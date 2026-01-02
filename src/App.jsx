// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
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
      <div className="flex h-screen w-full bg-slate-950 text-slate-100 overflow-hidden font-sans">

        {/* Toggle Button for Mobile/Collapsed view */}
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className={`absolute top-4 left-4 z-50 p-2 rounded-lg bg-slate-800/50 backdrop-blur-md border border-slate-700 hover:bg-slate-700 transition-colors ${showSidebar ? 'hidden' : 'block'}`}
          aria-label="Toggle Sidebar"
        >
          ☰
        </button>

        <Sidebar showSidebar={showSidebar} />

        {/* Main Content Area */}
        <div
          className={`
            flex-1 flex flex-col h-full overflow-hidden transition-all duration-300 ease-in-out
            ${showSidebar ? 'ml-72' : 'ml-0'}
            bg-slate-50 text-slate-900
          `}
        >
          <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6 lg:p-8 scroll-smooth">
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

          {/* Footer */}
          <footer className="py-4 border-t border-slate-800 bg-slate-950/80 backdrop-blur text-center text-sm text-slate-500">
            <span>© {new Date().getFullYear()}</span>
            <span
              onClick={() => navigate("/about")}
              className="mx-2 text-cyan-400 hover:text-cyan-300 cursor-pointer font-medium"
            >
              My App
            </span>
            |
            <span
              onClick={() => navigate("/Portfolio")}
              className="ml-2 text-purple-400 hover:text-purple-300 cursor-pointer font-medium"
            >
              kartmmhjn312
            </span>
          </footer>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App
