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
export const getResponse = async (prompt) => {
  try {
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
