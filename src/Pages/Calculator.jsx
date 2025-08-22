import React, { useState } from "react";

const Calculator = () => {
  const [input, setInput] = useState("");

  const handleButtonClick = (value) => {
    if (value === "C") {
      setInput("");
      return;
    }
    if (value === "⌫") {
      setInput((prev) => prev.slice(0, -1));
      return;
    }
    if (value === "=") {
      try {
        const result = eval(input);
        setInput(result.toString());
      } catch (error) {
        setInput("Error");
      }
      return;
    }
    setInput((prev) => prev + value);
  };

  // Define rows of buttons for custom layout
  const rows = [
    ["(", ")", "C", "⌫"],
    ["7", "8", "9", "/"],
    ["4", "5", "6", "*"],
    ["1", "2", "3", "-"],
    ["0", ".", "=", "+"],
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start pt-8 overflow-auto">
      {/* Heading */}
      <h1 className="text-5xl font-bold mb-6">Calculator</h1>
      <p className="mb-8 text-xl text-gray-700">
        Perform basic arithmetic calculations
      </p>

      <div className="bg-white p-8 rounded-xl shadow-2xl w-96">
        {/* Display Screen */}
        <div className="mb-6 p-4 border rounded text-right text-3xl min-h-[80px] w-full">
          {input || "0"}
        </div>
        {/* Calculator Buttons */}
        <div className="space-y-3">
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-4 gap-3">
              {row.map((btn, index) => {
                // Base glass effect style
                let btnClasses =
                  "p-4 rounded transition text-2xl shadow-lg border border-white/30 backdrop-blur-md ";
                // Apply glass background and hover effect
                // Check if button is a number (or "00")
                if (!isNaN(btn)) {
                  btnClasses += "bg-white/20 hover:bg-white/30 text-gray-900";
                } else if (btn === "⌫") {
                  btnClasses += "bg-white/20 hover:bg-white/30 text-red-500";
                } else if (btn === "=") {
                  btnClasses += "bg-white/20 hover:bg-white/30 text-blue-500";
                } else {
                  btnClasses += "bg-white/20 hover:bg-white/30 text-white";
                }
                return (
                  <button
                    key={index}
                    onClick={() => handleButtonClick(btn)}
                    className={btnClasses}
                  >
                    {btn}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calculator;

/* 
### Explanation

• The component uses a state variable, "input", to store the calculation string.
• The custom button layout is defined by the "rows" array.
• Clicking "C" clears the input, "⌫" deletes the last character, and "=" evaluates the expression.
• For the glass effect, each button uses:
    - A semi-transparent background (bg-white/20)
    - A hover state that slightly increases opacity (hover:bg-white/30)
    - A backdrop-blur (backdrop-blur-md) with a subtle border and shadow.
• The text colors are set conditionally: red for "⌫", blue for "=", dark gray for numbers, and white for the remaining buttons.
*/