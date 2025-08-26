# Use official Node.js image
FROM node:22

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies (limit concurrency to avoid 429)
RUN yarn install --production --network-concurrency 1

# Copy rest of the app
COPY . .

# Expose port (make sure it matches your app)
EXPOSE 8001

# Start the app
CMD ["yarn", "start"]
