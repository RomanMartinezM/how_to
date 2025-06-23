/**
 * API Service
 *
 * This file provides utility functions for making API requests.
 * It uses the configuration from api.js and provides methods for common HTTP operations.
 */

import { API_BASE_URL, OPEN_ROUTER_API_KEY, DEFAULT_HEADERS } from "./api";
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: OPEN_ROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": "<YOUR_SITE_URL>", // Optional. Site URL for rankings on openrouter.ai.
    "X-Title": "<YOUR_SITE_NAME>", // Optional. Site title for rankings on openrouter.ai.
  },
  dangerouslyAllowBrowser: true,
});

/**
 * Make a GET request to the API
 * @param {String} prompt - Prompt to pass
 * @returns {Promise} - The fetch promise
 */
// Function to store search topic in the database
const storeSearchTopic = async (topic) => {
  try {
    // Replace this with your actual database storage logic
    const response = await fetch('http://your-backend-api.com/api/search-topics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        topic,
        timestamp: new Date().toISOString(),
      }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to store search topic');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error storing search topic:', error);
    throw error;
  }
};

/**
 * Extract main topic from a search query
 * @param {String} query - The search query
 * @returns {String} - The extracted main topic
 */
const extractMainTopic = async (query) => {
  try {
    const response = await openai.chat.completions.create({
      model: "microsoft/mai-ds-r1:free",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that extracts the main topic from search queries. Respond with only the main topic, nothing else."
        },
        {
          role: "user",
          content: `Extract the main topic from this search query: "${query}"`
        }
      ],
      temperature: 0.3,
    });
    
    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error extracting main topic:", error);
    return query; // Return original query if extraction fails
  }
};

/**
 * Process search query and get response
 * @param {String} prompt - The search query
 * @returns {Promise<Object>} - The response with search results and extracted topic
 */
export const getResponse = async (prompt) => {
  try {
    // First extract the main topic
    const mainTopic = await extractMainTopic(prompt);
    
    // Store the topic in the database (you'll need to implement this function)
    // await storeSearchTopic(mainTopic);
    
    // Then get the response for the original query
    const response = await openai.chat.completions.create({
      model: "microsoft/mai-ds-r1:free",
      messages: [
        {
          role: "user",
          content: prompt, //"What is the meaning of life?",
        },
      ],
    });

    if (!response.choices[0].message) {
      throw new Error(`API error: ${response}`);
    }

    console.log("mainTopic: ", mainTopic);
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Make a GET request to the API
 * @param {string} endpoint - The API endpoint to call
 * @param {Object} options - Additional fetch options
 * @returns {Promise} - The fetch promise
 */
/*
export const get = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "GET",
      headers: DEFAULT_HEADERS,
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API GET request failed:", error);
    throw error;
  }
};
*/
/**
 * Make a POST request to the API
 * @param {string} endpoint - The API endpoint to call
 * @param {Object} data - The data to send in the request body
 * @param {Object} options - Additional fetch options
 * @returns {Promise} - The fetch promise
 */
/*
export const post = async (endpoint, data, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: DEFAULT_HEADERS,
      body: JSON.stringify(data),
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API POST request failed:", error);
    throw error;
  }
};
*/
// Export a default object with all methods
export default {
  getResponse,
  // get,
  // post,
  // put,
  // delete: del,
  // uploadFile,
};
