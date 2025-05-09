/**
 * API Configuration
 *
 * This file contains the API configuration including the base URL and API key.
 * The API key is loaded from environment variables for security.
 */

// API base URL - can be loaded from environment variables
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

// API key - should be loaded from environment variables
const API_KEY = import.meta.env.VITE_API_KEY || "";

// Default headers for API requests
const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

// Add API key to headers if available
if (API_KEY) {
  DEFAULT_HEADERS["Authorization"] = `Bearer ${API_KEY}`;
}

export { API_BASE_URL, API_KEY, DEFAULT_HEADERS };
