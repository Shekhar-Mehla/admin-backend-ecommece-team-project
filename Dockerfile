# Use Node LTS
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock first for caching
COPY package.json yarn.lock ./

# Install dependencies
# Try strict frozen lockfile first, fallback to normal install if mismatch
RUN yarn install --frozen-lockfile || yarn install

# Copy the rest of the code
COPY . .

# Expose port
EXPOSE 8000

# Start app
CMD ["yarn", "start"]
