"use client";
import { useState } from "react";
import resistors from "../resistors.json";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const targetValue = parseFloat(inputValue);
    if (isNaN(targetValue)) {
      alert("Please enter a valid number");
      return;
    }

    // Convert resistor object keys to numbers and sort in descending order
    const sortedResistors = Object.keys(resistors)
      .map(Number)
      .sort((a, b) => b - a);

    const resultResistors = [];
    let remainingValue = targetValue;

    for (const value of sortedResistors) {
      if (value === 0) continue;
      let maxCount = Math.floor(remainingValue / value);

      while (maxCount > 0 && remainingValue >= value) {
        resultResistors.push(...resistors[value]);
        remainingValue -= value;
        maxCount--;
      }

      if (remainingValue === 0) break;
    }

    if (remainingValue > 0) {
      alert("Unable to match the exact value with available resistors.");
    }

    setResult(resultResistors);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Resistor Calculator
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="border border-gray-300 rounded-lg w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter target resistance (e.g., 99500)"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-medium py-3 rounded-lg shadow-md hover:bg-blue-600 transition"
          >
            Calculate
          </button>
        </form>

        {result.length > 0 && (
          <div className="mt-6 bg-gray-50 rounded-lg shadow-inner p-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Result:
            </h2>
            <ul className="space-y-1">
              {result.map((resistor, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center border-b border-gray-200 pb-1 last:border-b-0"
                >
                  <a
                    href={resistor.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-blue-500 hover:underline"
                  >
                    {resistor.manufacturer}
                  </a>
                  <span className="text-gray-600">{resistor.value} Ω ({resistor.size})</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
