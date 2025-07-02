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
/**
 * Store search data in the database
 * @param {Object} request - The request to store with the following properties:
 *   - topic: The search topic. It can be null
 *   - search_result: The search result
 * @returns {Promise} - The fetch promise
 */
const createSearchData = async (request) => {
  try {
    const response = await fetch(`${API_BASE_URL}/searches`, {
      method: 'POST',
      headers: DEFAULT_HEADERS,
      body: request,
    });
    
    if (!response.data) {
      throw new Error(response.data);
    }
    
    return await response.data;
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
    
    if (!response.data) {
      throw new Error(response.data);
    }
    
    return await response.data;
  } catch (error) {
    console.error('Error went wrong: ', error);
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
    
    if (!response.data) {
      throw new Error(response.data);
    }
    
    return await response.data;
  } catch (error) {
    console.error('Error went wrong: ', error);
    throw error;
  }
};

/**
 * Extract main topic from a search query
 * @param {String} query - The search query
 * @returns {String} - The extracted main topic
 */
const extractMainTopic = async (query) => {
  if (!query || typeof query !== 'string' || !query.trim()) {
    console.warn('Invalid query provided to extractMainTopic');
    return null;
  }

  try {
    const response = await openai.chat.completions.create({
      model: "microsoft/mai-ds-r1:free",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that extracts the main topic from a search query. Return only the main topic, nothing else.",
        },
        {
          role: "user",
          content: `Extract the main topic from this search query: "${query}"`,
        },
      ],
      max_tokens: 50,
    }, {
      timeout: 10000 // 10 second timeout
    });

    if (!response?.choices?.[0]?.message?.content) {
      throw new Error('Invalid response format from AI service');
    }

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error extracting main topic:", error);
    // Don't fail the entire search if topic extraction fails
    return null;
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
          content: prompt, 
        },
      ],
    });

    if (!response.choices[0].message) {
      throw new Error(`API error: ${response}`);
    }

    console.log("mainTopic: ", mainTopic);

    await createSearchData({
      topic: mainTopic,
      search_result: response.choices[0].message.content,
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
