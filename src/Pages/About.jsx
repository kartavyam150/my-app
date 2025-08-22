import React from "react";
import { useNavigate } from "react-router-dom";

const components = [
	{ name: "HelloWorld", desc: "Displays a greeting and demonstrates state and events.", path: "/" },
	{ name: "Counter", desc: "A simple counter to increment and decrement numbers.", path: "/counter" },
	{ name: "UserList", desc: "Shows a list of users.", path: "/userlist" },
	{ name: "UserTable", desc: "Displays users in a table format.", path: "/usertable" },
	{ name: "Hooks", desc: "Demonstrates React hooks with a live input example.", path: "/hooks" },
	{ name: "CurtainShow", desc: "A curtain animation effect.", path: "/curtains" },
	{ name: "NumberToIndianWords", desc: "Converts numbers to Indian words.", path: "/numtowords" },
	{ name: "AudioToWords", desc: "Converts audio input to text.", path: "/audiotowords" },
	{ name: "ProgressTrackerPage", desc: "A progress tracker component.", path: "/progress" },
	{ name: "HoliSplash", desc: "A fun Holi splash animation with balloons and water waves.", path: "/holi" },
	// { name: "Random Letter Splash", desc: "Throw random letters with splash effects.", path: "/randomletter" }, // NEW
	{ name: "Vocab Match Game", desc: "Match vocabulary words with their meanings.", path: "/vocabmatch" }, // NEW
	{ name: "Memory Match Game", desc: "Classic memory card matching game.", path: "/memoryMatch" }, // NEW
	{ name: "Notepad", desc: "A rich text editor with save/load using local storage.", path: "/editableeditor" },
	{ name: "Sidebar", desc: "Navigation sidebar for easy access to all pages.", path: "#" },
	{ name: "Calculator", desc: "A basic calculator with arithmetic operations.", path: "/calculator" },
	{ name: "TodoList", desc: "A simple todo list application with add/remove functionality.", path: "/todolist" },
	{ name: "Product Listing", desc: "A list of products with add to cart functionality.", path: "/ProductListing" },
	{ name: "MaterialYouNewTab", desc: "A new tab page styled with Material You design.", path: "/newtab" },
	{ name: "TicTacToe", desc: "A classic Tic Tac Toe game (2-player & vs Computer).", path: "/tictactoe" }, // UPDATED
	{ name: "WeatherWidget", desc: "A widget to display Real-Time weather information.", path: "/weather" },
	{ name: "UserForm", desc: "A form to add or edit user details.", path: "/userform" },
	{ name: "Contact", desc: "A contact form page with EmailJS integration.", path: "/contact" }, // UPDATED
	{ name: "Shayari", desc: "A Shayari (poetry) display component.", path: "/shayari" },
	{ name: "ImageToText", desc: "Extracts text from images.", path: "/imagetotext" },
	{ name: "Morse Code Converter", desc: "Convert text to Morse code and vice versa, with clipboard support.", path: "/morse" }, // UPDATED
	{ name: "Land Measurement Converter", desc: "Convert and compare different land measurement units.", path: "/landmeasurement" },
	{ name: "Clock Display", desc: "A digital clock component.", path: "/clock" }, // NEW
	{ name: "Solar System Explorer", desc: "Explore planets and facts about the solar system.", path: "/solar" }, // NEW
	{ name: "Dictionary", desc: "Get English and Hindi meanings for words.", path: "/dictionary" }, // NEW
	{ name: "AI Assistant (Gemini)", desc: "Chat with Gemini AI using your own backend.", path: "/geminibhAI" }, // NEW
];

const About = () => {
	const navigate = useNavigate();

	return (
		<div
			className="min-h-screen overflow-y-auto"
			style={{ fontFamily: '"Poppins", sans-serif' }}
		>
			<div
				className="mx-auto my-10 p-8 bg-white/80 rounded-xl shadow-lg border border-blue-100"
				style={{ maxWidth: "1200px" }} // Increased width for wider layout
			>
				{/* Navigation Buttons at the Top */}
				<div className="flex gap-3 mb-6">
					<button
						className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
						onClick={() => navigate("/")}
					>
						Go to Default Page
					</button>
					<button
						className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
						onClick={() => navigate("/home")}
					>
						Go to Home
					</button>
					<button
						className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
						onClick={() => navigate("/userlist")}
					>
						Go to UserList
					</button>
				</div>
				<h1 className="text-3xl font-bold mb-4 text-blue-700">About This Project</h1>
				<p className="mb-6 text-gray-700">
					This React project is a collection of interactive components and utilities,
					demonstrating various features of React such as hooks, routing, animation, and
					more. Use the sidebar to explore each component!
				</p>
				<h2 className="text-2xl font-semibold mb-2 text-blue-600">Components</h2>
				<ul className="mb-8 space-y-3">
					{components.map((c) => (
						<li key={c.name} className="flex items-center justify-between bg-blue-50 rounded-lg px-4 py-2 shadow-sm">
							<div>
								<strong className="text-blue-900">{c.name}</strong>
								<span className="text-gray-600">: {c.desc}</span>
							</div>
							{c.path !== "#" && (
								<button
									className="ml-4 text-xs px-3 py-1 rounded bg-blue-100 border border-blue-400 text-blue-700 hover:bg-blue-200 transition"
									onClick={() => navigate(c.path)}
								>
									Go
								</button>
							)}
						</li>
					))}
				</ul>

				<h2 className="text-2xl font-semibold mb-2 text-blue-600">Dependencies &amp; Tools Used</h2>
				<ul className="mb-8 list-disc list-inside text-gray-700 space-y-1">
					<li>
						<strong>IDE:</strong> Visual Studio Code
					</li>
					<li>
						<strong>Framework:</strong> React (with Vite)
					</li>
					<li>
						<strong>Styling:</strong> Tailwind CSS
					</li>
					<li>
						<strong>Routing:</strong> React Router DOM
					</li>
					<li>
						<strong>Icons:</strong> React Icons
					</li>
					<li>
						<strong>State Management:</strong> React useState/useEffect/hooks
					</li>
					<li>
						<strong>Other Tools:</strong> Local Storage, GitHub for profile images
					</li>
				</ul>

				<p className="italic text-gray-500 mb-6">
					Created by Kartavya Mahajan, 2025.
				</p>
			</div>
		</div>
	);
};

export default About;
