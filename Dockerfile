# Use official Node.js image
FROM node:22

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy rest of the backend code
COPY . .

# Expose port (make sure it matches the one in server.js, usually 5000 or 8080)
EXPOSE 8001

# Run the app
CMD ["npm", "start"]