import React, { useState, useEffect } from "react";
import "./Calculator.css";

const Calculator = () => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [scientificMode, setScientificMode] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    document.body.style.backgroundColor = isDark ? "#121212" : "#ffffff";
  }, [isDark]);

  const handleClick = (value) => {
    setInput((prev) => prev + value);
  };

  const handleClear = () => {
    setInput("");
  };

  const handleEqual = () => {
    try {
      const result = eval(input).toString();
      setInput(result);
      setHistory((prev) => [...prev, `${input} = ${result}`]);
    } catch (err) {
      setInput("Error");
    }
  };

  const toggleScientific = () => {
    setScientificMode((prev) => !prev);
  };

  const handleScientific = (func) => {
    try {
      let result;
      const value = parseFloat(input);
      switch (func) {
        case "sin":
          result = Math.sin(value);
          break;
        case "cos":
          result = Math.cos(value);
          break;
        case "tan":
          result = Math.tan(value);
          break;
        case "log":
          result = Math.log10(value);
          break;
        case "ln":
          result = Math.log(value);
          break;
        case "sqrt":
          result = Math.sqrt(value);
          break;
        default:
          result = value;
      }
      setHistory((prev) => [...prev, `${func}(${input}) = ${result}`]);
      setInput(result.toString());
    } catch {
      setInput("Error");
    }
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div className={`calculator ${isDark ? "dark" : "light"}`}>
      <div className="header">
        <h2 className="title">Sat Calculator</h2>
        <button className="theme-toggle" onClick={toggleTheme}>
          {isDark ? "🌞" : "🌙"}
        </button>
      </div>

      <input className="display" value={input} readOnly />

      <div className="top-buttons">
        <button className="scientific-btn" onClick={toggleScientific}>
          {scientificMode ? "Basic" : "Scientific"}
        </button>
      </div>

      {scientificMode && (
        <div className="scientific">
          <button onClick={() => handleScientific("sin")}>sin</button>
          <button onClick={() => handleScientific("cos")}>cos</button>
          <button onClick={() => handleScientific("tan")}>tan</button>
          <button onClick={() => handleScientific("log")}>log</button>
          <button onClick={() => handleScientific("ln")}>ln</button>
          <button onClick={() => handleScientific("sqrt")}>√</button>
        </div>
      )}

      <div className="keypad">
        <div className="digits">
          {[7, 8, 9, 4, 5, 6, 1, 2, 3].map((num) => (
            <button key={num} onClick={() => handleClick(num.toString())}>
              {num}
            </button>
          ))}
          <button onClick={() => handleClick("0")}>0</button>
          <button onClick={() => handleClick(".")}>.</button>
          <button onClick={handleClear}>C</button>
        </div>

        <div className="operators">
          <button onClick={() => handleClick("/")}>÷</button>
          <button onClick={() => handleClick("*")}>×</button>
          <button onClick={() => handleClick("-")}>−</button>
          <button onClick={() => handleClick("+")}>+</button>
          <button onClick={handleEqual}>=</button>
        </div>
      </div>

      <div className="history">
        <h3>History</h3>
        <ul>
          {history.slice().reverse().map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Calculator;
