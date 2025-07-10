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
 * Store search data in the database
 * @param {Object} data - The request to store with the following properties:
 *   - topic: The search topic. It can be null
 *   - search_result: The search result
 * @returns {Promise} - The fetch promise
 */
const createSearchData = async (data) => {
  try {
    const response = await fetch(`${API_BASE_URL}/searches`, {
      method: 'POST',
      headers:DEFAULT_HEADERS,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        message: `HTTP error! status: ${response.status}`
      }));
      throw new Error(errorData.message || 'Failed to create search');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error went wrong: ', error);
    throw error;
  }
};


/**
 * Get the most recent searches
 *
 * @returns {Promise} - The fetch promise
 */
const getMostRecentSearches = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/searches/most-recent`, {
      method: 'GET',
      headers: DEFAULT_HEADERS,
    });
    
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch recent searches');
    }
    return data;
  } catch (error) {
    throw error;
  }
};

/**
 * Get the most querying topics
 *
 * @returns {Promise} - The fetch promise
 */
const getSearchTopicsMostQuerying = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/searches/most-querying-topics`, {
      method: 'GET',
      headers: DEFAULT_HEADERS,
    });
    
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch recent searches');
    }
    return data;
  } catch (error) {
    throw error;
  }
};

/**
 * Process search query and get response
 * @param {String} prompt - The search query
 * @returns {Promise<Object>} - The response with search results and extracted topic
 */
export const getResponse = async (prompt) => {
  try {
    const response = await openai.chat.completions.create({
      model: "microsoft/mai-ds-r1:free",
      messages: [
        {
          role: "user",
          content: prompt, 
        },
      ],
    });

    if (!response.choices[0].message) {
      throw new Error(`API error: ${response}`);
    }

    await createSearchData({
      topic: null,
      search_query: prompt,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

// Export a default object with all methods
export default {
  getResponse,
  createSearchData,
  getMostRecentSearches,
  getSearchTopicsMostQuerying,
};
