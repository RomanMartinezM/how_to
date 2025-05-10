// API base URL - can be loaded from environment variables
const API_BASE_URL =
  import.meta.env.VITE_BASE_URL || "http://localhost:8000/api";
// API key - should be loaded from environment variables
const OPEN_ROUTER_API_KEY = import.meta.env.VITE_OPEN_ROUTER_KEY || "";

// Default headers for API requests
const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

// Add API key to headers if available
if (OPEN_ROUTER_API_KEY) {
  DEFAULT_HEADERS["Authorization"] = `Bearer ${OPEN_ROUTER_API_KEY}`;
}

export { API_BASE_URL, OPEN_ROUTER_API_KEY, DEFAULT_HEADERS };
