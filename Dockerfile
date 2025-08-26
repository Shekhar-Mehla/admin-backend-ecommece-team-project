# Use official Node.js image
FROM node:22

# Set working directory
WORKDIR /app

# Copy dependency files first for layer caching
COPY package.json yarn.lock ./

# Install only production dependencies
RUN yarn install --production

# Copy the rest of the application
COPY . .

# Expose the port the app runs on (match with server.js)
EXPOSE 8001

# Start the application
CMD ["yarn", "start"]
