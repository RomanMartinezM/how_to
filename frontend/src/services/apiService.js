/**
 * API Service
 *
 * This file provides utility functions for making API requests.
 * It uses the configuration from api.js and provides methods for common HTTP operations.
 */

import { API_BASE_URL, DEFAULT_HEADERS } from "./api";

/**
 * Make a GET request to the API
 * @param {string} endpoint - The API endpoint to call
 * @param {Object} options - Additional fetch options
 * @returns {Promise} - The fetch promise
 */
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

/**
 * Make a POST request to the API
 * @param {string} endpoint - The API endpoint to call
 * @param {Object} data - The data to send in the request body
 * @param {Object} options - Additional fetch options
 * @returns {Promise} - The fetch promise
 */
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

/**
 * Make a PUT request to the API
 * @param {string} endpoint - The API endpoint to call
 * @param {Object} data - The data to send in the request body
 * @param {Object} options - Additional fetch options
 * @returns {Promise} - The fetch promise
 */
export const put = async (endpoint, data, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "PUT",
      headers: DEFAULT_HEADERS,
      body: JSON.stringify(data),
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API PUT request failed:", error);
    throw error;
  }
};

/**
 * Make a DELETE request to the API
 * @param {string} endpoint - The API endpoint to call
 * @param {Object} options - Additional fetch options
 * @returns {Promise} - The fetch promise
 */
export const del = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "DELETE",
      headers: DEFAULT_HEADERS,
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API DELETE request failed:", error);
    throw error;
  }
};

/**
 * Upload a file to the API
 * @param {string} endpoint - The API endpoint to call
 * @param {FormData} formData - The FormData object containing the file
 * @param {Object} options - Additional fetch options
 * @returns {Promise} - The fetch promise
 */
export const uploadFile = async (endpoint, formData, options = {}) => {
  // Remove Content-Type header as it will be set automatically with the correct boundary
  const headers = { ...DEFAULT_HEADERS };
  delete headers["Content-Type"];

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: headers,
      body: formData,
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API file upload failed:", error);
    throw error;
  }
};

// Export a default object with all methods
export default {
  get,
  post,
  put,
  delete: del,
  uploadFile,
};
