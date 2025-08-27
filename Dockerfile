# Use official Node.js image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock first for caching
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the project
COPY . .

# Expose port
EXPOSE 8000

# Start the server
CMD ["node", "server.js"]
