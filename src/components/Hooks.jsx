import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Hooks = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      alert("Welcome!, " + name);
      setName('');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-gray-50 rounded-lg shadow-md">
      <button 
        onClick={() => navigate("/")} 
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Go to Default Page
      </button>
      <h1 className="mb-4 text-2xl">Hello, {name}</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Enter your name"
        className="mt-2 p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default Hooks;

