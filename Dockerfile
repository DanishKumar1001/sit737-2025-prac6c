# Use an official Node.js runtime as a base image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 3000 (or whatever your app uses)
EXPOSE 3000

# Start the application
CMD ["node", "calculator.js"]
