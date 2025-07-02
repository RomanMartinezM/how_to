import { useState } from "react";
import {apiService, getMostRecentSearches, getSearchTopicsMostQuerying} from "../../services/apiService";
import Notification from "../Notification";

const SearchForm = ({ setContent }) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSearch = async () => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      setMessage("Please enter a search query");
      return;
    }
    
    setLoading(true);
    setMessage("Searching, please wait...");
    setContent(""); // Clear previous content immediately when search starts
    
    try {
      const promptRes = await apiService.getResponse(trimmedQuery);
      if (promptRes?.choices?.[0]?.message?.content) {
        setContent(promptRes.choices[0].message.content);
        setMessage(""); // Clear any previous messages on success
      } else {
        throw new Error("Received empty response from the server");
      }
    } catch (error) {
      console.error("Search error:", error);
      const errorMessage = error.message || "An error occurred while searching";
      setMessage(errorMessage);
      setContent("");
      
      // Don't throw the error here as we're handling it in the UI
      // This prevents uncaught promise warnings in the console
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full max-w-xl mx-auto bg-white rounded-full">
      <input
        placeholder="Search for content..."
        className={`rounded-full w-full h-16 bg-transparent py-2 pl-8 pr-32 outline-none border-2 ${message && message.includes('Error') ? 'border-red-300' : 'border-gray-100'} shadow-md hover:outline-none focus:ring-teal-200 focus:border-teal-200`}
        type="text"
        name="query"
        id="query"
        value={query}
        disabled={loading}
        onChange={(e) => {
          setQuery(e.target.value);
          // Clear error message when user starts typing
          if (message) setMessage('');
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !loading && query.trim()) {
            handleSearch();
          }
        }}
      />
      <button
        type="button"
        disabled={!query.trim() || loading}
        className={`absolute inline-flex items-center h-10 px-4 py-2 text-sm text-white transition duration-150 ease-in-out rounded-full outline-none right-3 top-3 ${!query.trim() || loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-teal-600 hover:bg-teal-700'} sm:px-6 sm:text-base sm:font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500`}
        onClick={handleSearch}
        aria-busy={loading}>
        <svg
          className="-ml-0.5 sm:-ml-1 mr-2 w-4 h-4 sm:h-5 sm:w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
        Search
      </button>

      <Notification
        loading={loading}
        message={message}
      />
    </div>
  );
};

export default SearchForm;
