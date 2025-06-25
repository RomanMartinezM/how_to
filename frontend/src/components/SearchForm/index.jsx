import { useState } from "react";
import apiService from "../../services/apiService";
import Notification from "../Notification";
import { Client } from "@gradio/client";

const SearchForm = ({ 
  setContent, 
  placeholder = "Search for content...", 
  buttonText = "Search" 
}) => {
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
      setMessage(error.message || "An error occurred while searching");
      setContent("");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = async () => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      setMessage("Please enter a description for the image");
      return;
    }
    
    setLoading(true);
    setMessage("Generating image, please wait...");
    setContent("");
    
    try {
      // Connect to the text-to-image Gradio space
      const app = await Client.connect("Pratap2002/text-to-image");
      
      // Call the predict function with the user's query
      const result = await app.predict("/predict", [
        trimmedQuery,  // prompt
        7,             // num_inference_steps
        7.5,           // guidance_scale
        42,            // seed (can be random)
        "normal"       // safety_checker
      ]);
      
      // Log the full response for debugging
      console.log("API Response:", result);
      
      // Check if we have a valid image URL in the response
      if (result && result.data && result.data[0]) {
        const imageUrl = result.data[0];
        
        // Ensure the URL is valid
        if (typeof imageUrl === 'string' && (imageUrl.startsWith('http') || imageUrl.startsWith('data:image'))) {
          setContent(`<div class="mt-4 flex justify-center">
            <img src="${imageUrl}" alt="Generated image" class="max-w-full h-auto rounded-lg shadow-lg" />
          </div>`);
          setMessage("Image generated successfully!");
        } else {
          console.error("Invalid image URL format:", imageUrl);
          throw new Error("Received an invalid image URL from the API");
        }
      } else {
        console.error("Unexpected API response format:", result);
        throw new Error("No valid image data received from the API");
      }
    } catch (error) {
      console.error("Generation error:", error);
      const errorMessage = error.response?.data?.error || 
                         error.message || 
                         "An error occurred while generating the image. Please try again.";
      setMessage(errorMessage);
      setContent("");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    if (buttonText === "Search") {
      handleSearch();
    } else {
      handleGenerate();
    }
  };

  return (
    <div className="relative w-full max-w-xl mx-auto bg-white rounded-full">
      <input
        placeholder={placeholder}
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
        onClick={handleSubmit}
        aria-busy={loading}
      >
        {buttonText === "Search" ? (
          <>
            <svg className="-ml-0.5 sm:-ml-1 mr-2 w-4 h-4 sm:h-5 sm:w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {buttonText}
          </>
        ) : (
          <>
            <svg className="-ml-0.5 sm:-ml-1 mr-2 w-4 h-4 sm:h-5 sm:w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            {buttonText}
          </>
        )}
      </button>

      <Notification
        loading={loading}
        message={message}
      />
    </div>
  );
};

export default SearchForm;
