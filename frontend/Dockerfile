# Use the Node.js image
FROM node:20.11

# Set working directory
WORKDIR /app

# Copy Node.js project to the container
COPY . .

# Install dependencies
RUN npm install

# Expose port
EXPOSE 3000

# Define the default command
# CMD ["npm", "start"]
CMD ["npm", "run", "dev"]
