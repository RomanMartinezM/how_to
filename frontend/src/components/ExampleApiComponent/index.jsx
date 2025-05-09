import React, { useState, useEffect } from "react";
import apiService from "../../services/apiService";

/**
 * Example component demonstrating API service usage
 *
 * This component shows how to:
 * 1. Fetch data from an API on component mount
 * 2. Handle loading and error states
 * 3. Submit data to an API
 */
function ExampleApiComponent() {
  // State for storing data from API
  const [data, setData] = useState([]);
  // Loading state
  const [loading, setLoading] = useState(true);
  // Error state
  const [error, setError] = useState(null);
  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Function to fetch data from API
  const fetchData = async () => {
    try {
      setLoading(true);
      // Replace '/items' with your actual API endpoint
      const response = await apiService.get("/items");
      setData(response);
      setError(null);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to load data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      // Replace '/items' with your actual API endpoint
      const response = await apiService.post("/items", formData);

      // Add the new item to the data array
      setData([...data, response]);

      // Reset form
      setFormData({
        title: "",
        description: "",
      });

      setError(null);
    } catch (err) {
      console.error("Error submitting data:", err);
      setError("Failed to submit data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Render loading state
  if (loading && data.length === 0) {
    return <div className="p-4">Loading...</div>;
  }

  // Render error state
  if (error && data.length === 0) {
    return (
      <div className="p-4 text-red-500">
        <p>{error}</p>
        <button
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={fetchData}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">API Example Component</h2>

      {/* Display error message if there is one */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Form for submitting new data */}
      <form
        onSubmit={handleSubmit}
        className="mb-6">
        <div className="mb-4">
          <label className="block mb-1">Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded"
            rows="3"
            required
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
          disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>

      {/* Display data from API */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Items:</h3>
        {data.length === 0 ? (
          <p>No items found.</p>
        ) : (
          <ul className="border rounded divide-y">
            {data.map((item) => (
              <li
                key={item.id}
                className="p-3">
                <h4 className="font-medium">{item.title}</h4>
                <p className="text-gray-600">{item.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Refresh button */}
      <button
        className="mt-4 px-4 py-2 bg-gray-200 rounded"
        onClick={fetchData}
        disabled={loading}>
        {loading ? "Refreshing..." : "Refresh Data"}
      </button>
    </div>
  );
}

export default ExampleApiComponent;
