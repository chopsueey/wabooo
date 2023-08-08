import React, { useState } from "react";
import { searchRequest } from "../fetchRequests/SearchRequests";
import GeneralStore from "../store/GeneralContext";

export function Searchbar() {
  const { setActiveTab, setResults } = GeneralStore();
  const [userInput, setUserInput] = useState("");

  async function handleSearchClick() {
    const response = await searchRequest(userInput);
    const responseData = await response.json();
    console.log(responseData);
    setResults(responseData);
    setActiveTab("Results");
  }

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      handleSearchClick();
    }
  }

  return (
    <div className="flex items-center justify-center my-3">
      <input
        onChange={(e) => setUserInput(e.target.value)}
        onKeyPress={handleKeyPress}
        className="mt-6 px-4 py-1 bg-white text-gray-800 shadow-lg shadow-gray-800 rounded-md w-48 sm:w-auto mr-2"
        type="text"
        placeholder="What about..?"
      />
      <button
        onClick={handleSearchClick}
        className="mt-6 text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:outline-none shadow-lg shadow-gray-800 font-medium rounded-lg text-sm px-5 py-1"
      >
        🔎
      </button>
    </div>
  );
}
