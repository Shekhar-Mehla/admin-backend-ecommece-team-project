# Admin Backend

This is the backend service for the ecommerce admin panel. It is built with Node.js, Express, and MongoDB.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [Yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/)

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/your-username/backend-admin.git
   cd backend-admin
   ```

2. **Install dependencies:**

   ```sh
   npm init -y
   yarn
   yarn add mongodb express cors bcrypt jsonwebtoken
   ```

3. **Set up environment variables:**

   - Copy `example.env` to `.env` and update the values as needed.

   ```sh
   cp example.env .env
   ```

   - Edit `.env` to set your MongoDB connection string.

4. **Start the server:**
   ```sh
   yarn dev
   ```
   or
   ```sh
   yarn start
   ```

---

## Dependency Check

Before running the project, make sure to install all dependencies listed in `package.json`:

```sh
yarn
```

To check for outdated dependencies, run:

```sh
yarn outdated
```

To update all dependencies to their latest versions:

```sh
yarn upgrade
```

---

## Project Dependencies

Below is a list of common dependencies for a Node.js backend project.  
**Check your `package.json` for the exact versions and packages.**

### Main Dependencies

- **express** — Web framework for Node.js
- **mongoose** — MongoDB object modeling tool

- **cors** — Enable Cross-Origin Resource Sharing
- **morgan** — HTTP request logger middleware

### Dev Dependencies

- **nodemon** — Auto-restarts server on code changes

You can view the full list and versions in your `package.json` file.

---

## Project Structure

```
src/
  config/
    dbConfig.js      # Database connection logic
  models/            # Mongoose models
  routes/            # API routes
  controllers/       # Route controllers
  ...
```

---

## Environment Variables

- `MONGO_URI` — MongoDB connection string

---

## License

MIT
