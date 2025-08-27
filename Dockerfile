FROM node:22

WORKDIR /app

# Copy package.json first
COPY package.json ./

# Install dependencies (yarn will create yarn.lock if missing)
RUN yarn install || npm install

# Copy rest of the code
COPY . .

EXPOSE 8000
CMD ["node", "server.js"]
