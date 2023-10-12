# Use an official Node.js runtime as the base image
FROM node:18-alpine3.17

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application source code to the container
COPY . .

# Expose the port that the application will run on (adjust as needed)
EXPOSE 8080
# Start the application
CMD ["npm", "start"]
