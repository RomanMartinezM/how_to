/**
 * Example Usage of API Service
 *
 * This file demonstrates how to use the API service in your components.
 * You can copy these examples into your components as needed.
 */

import apiService from "./apiService";
// Or import specific methods
// import { get, post } from "./apiService";

/**
 * Example: Fetching data from an API
 */
export const fetchUserData = async (userId) => {
  try {
    // Using the get method from apiService
    const userData = await apiService.get(`/users/${userId}`);
    return userData;
  } catch (error) {
    console.error("Failed to fetch user data:", error);
    throw error;
  }
};

/**
 * Example: Sending data to an API
 */
export const createUser = async (userData) => {
  try {
    // Using the post method from apiService
    const response = await apiService.post("/users", userData);
    return response;
  } catch (error) {
    console.error("Failed to create user:", error);
    throw error;
  }
};

/**
 * Example: Updating data
 */
export const updateUser = async (userId, userData) => {
  try {
    // Using the put method from apiService
    const response = await apiService.put(`/users/${userId}`, userData);
    return response;
  } catch (error) {
    console.error("Failed to update user:", error);
    throw error;
  }
};

/**
 * Example: Deleting data
 */
export const deleteUser = async (userId) => {
  try {
    // Using the delete method from apiService
    const response = await apiService.delete(`/users/${userId}`);
    return response;
  } catch (error) {
    console.error("Failed to delete user:", error);
    throw error;
  }
};

/**
 * Example: Uploading a file
 */
export const uploadUserAvatar = async (userId, fileInput) => {
  try {
    // Create a FormData object
    const formData = new FormData();
    formData.append("avatar", fileInput.files[0]);

    // Using the uploadFile method from apiService
    const response = await apiService.uploadFile(
      `/users/${userId}/avatar`,
      formData
    );
    return response;
  } catch (error) {
    console.error("Failed to upload avatar:", error);
    throw error;
  }
};

/**
 * Example: Using in a React component
 *
 * This is a simplified example of how to use the API service in a React component.
 * For a complete implementation, copy this code to a new component file and modify as needed.
 */

// Example React component code (for reference only):
/*
import React, { useState, useEffect } from "react";
import { fetchUserData } from "../services/exampleUsage";

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);
        const userData = await fetchUserData(userId);
        setUser(userData);
        setError(null);
      } catch (err) {
        setError("Failed to load user data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>No user found</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>
      <p>Other user details would go here</p>
    </div>
  );
}

export default UserProfile;
*/
