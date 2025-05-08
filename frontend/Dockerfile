# Use the Node.js image
FROM node:20.11

# Set working directory inside the container
WORKDIR /app

# Copy package files first to improve caching
COPY package.json ./

# Install dependencies
RUN npm install

# Copy the remaining project files
COPY . .

# Expose port (adjust if needed)
EXPOSE 3000

# Define the default command
CMD ["npm", "run", "dev"]
