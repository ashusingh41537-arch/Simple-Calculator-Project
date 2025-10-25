import React, { useState, useEffect } from "react";

const App = () => {
  const [input, setInput] = useState("");

  const handleClick = (value) => {
    if (value === "AC") {
      setInput("");
    } else if (value === "DEL") {
      setInput(input.slice(0, -1));
    } else if (value === "=") {
      try {
        setInput(eval(input).toString());
      } catch {
        setInput("Error");
      }
    } else {
      setInput(input + value);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        (e.key >= "0" && e.key <= "9") ||
        ["+", "-", "*", "/"].includes(e.key)
      ) {
        setInput((prev) => prev + e.key);
      } else if (e.key === "Enter") {
        try {
          setInput(eval(input).toString());
        } catch {
          setInput("Error");
        }
      } else if (e.key === "Backspace") {
        setInput((prev) => prev.slice(0, -1));
      } else if (e.key === "Escape") {
        setInput("");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [input]);

  const buttons = [
    "AC",
    "DEL",
    "/",
    "*",
    "7",
    "8",
    "9",
    "-",
    "4",
    "5",
    "6",
    "+",
    "1",
    "2",
    "3",
    "=",
    "0",
    ".",
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-black/50 p-4 rounded-xl w-80">
        <div className="text-right text-white text-3xl bg-black/60 rounded-xl p-4 mb-4 h-20 flex items-end justify-end overflow-x-auto">
          {input || "0"}
        </div>
        <div className="grid grid-cols-4 gap-3">
          {buttons.map((btn) => (
            <button
              key={btn}
              onClick={() => handleClick(btn)}
              className={`text-xl font-semibold py-4 rounded-xl transition-all duration-200 ${
                btn === "="
                  ? "bg-green-500 hover:bg-green-600 text-white"
                  : btn === "AC"
                  ? "bg-red-500 hover:bg-red-600 text-white"
                  : btn === "DEL"
                  ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                  : "bg-gray-700 hover:bg-gray-800 text-white"
              }`}
            > 
              {btn}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;