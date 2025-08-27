# 1️⃣ Use Node.js 22 base image (lightweight Alpine)
FROM node:22-alpine

# 2️⃣ Set working directory inside container
WORKDIR /app

# 3️⃣ Copy package.json and yarn.lock for dependency installation
COPY package.json yarn.lock ./

# 4️⃣ Install dependencies using Yarn
RUN yarn install --production

# 5️⃣ Copy all other backend code into container
COPY . .

# 6️⃣ Expose the port your backend runs on
EXPOSE 8000

# 7️⃣ Start the backend using the start script from package.json
CMD ["yarn", "start"]
