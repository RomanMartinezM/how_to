# API Service Setup

This directory contains files for handling API requests in your React application.

## Files

- `api.js` - Contains API configuration including base URL and API key
- `apiService.js` - Provides utility functions for making API requests (GET, POST, PUT, DELETE, file uploads)
- `exampleUsage.js` - Contains examples of how to use the API service in your components

## Environment Variables

The API service uses environment variables for configuration. These are defined in the `.env` file in the root of the frontend directory:

- `VITE_API_BASE_URL` - The base URL for API requests (default: http://localhost:8000/api)
- `VITE_API_KEY` - Your API key for authentication

## How to Use

### 1. Set up your environment variables

Make sure your `.env` file in the frontend directory contains the necessary variables:

```
VITE_API_BASE_URL=http://localhost:8000/api
VITE_API_KEY=your_api_key_here
```

### 2. Import the API service in your component

```javascript
import apiService from "../services/apiService";
// Or import specific methods
// import { get, post } from "../services/apiService";
```

### 3. Make API requests

```javascript
// Example: GET request
const fetchData = async () => {
  try {
    const data = await apiService.get("/endpoint");
    console.log(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// Example: POST request
const createData = async () => {
  try {
    const newData = { name: "Example", value: 123 };
    const response = await apiService.post("/endpoint", newData);
    console.log(response);
  } catch (error) {
    console.error("Error creating data:", error);
  }
};
```

### 4. File uploads

```javascript
const handleFileUpload = async (event) => {
  try {
    const formData = new FormData();
    formData.append("file", event.target.files[0]);

    const response = await apiService.uploadFile("/upload", formData);
    console.log(response);
  } catch (error) {
    console.error("Error uploading file:", error);
  }
};
```

## Best Practices

1. **Centralize API calls**: Create service files for specific features (e.g., `userService.js`, `productService.js`) that use the apiService for making requests.

2. **Error handling**: Always use try/catch blocks when making API requests to handle errors gracefully.

3. **Loading states**: Implement loading states in your components when making API requests to improve user experience.

4. **Security**: Never expose sensitive API keys in your client-side code. Use environment variables and ensure your API has proper authentication.

5. **Caching**: Consider implementing caching for frequently accessed data to improve performance.

## Example Implementation

See `exampleUsage.js` for detailed examples of how to use the API service in your components.
