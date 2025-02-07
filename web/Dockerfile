# Use Node.js base image
FROM node:18

# Set working directory inside container
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy application files
COPY . .

# Expose port 5000
EXPOSE 5000

# Command to start the app
CMD ["npm", "start"]
