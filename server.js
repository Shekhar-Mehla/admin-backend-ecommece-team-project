import express from "express";
import connection from "./src/config/dbConfig.js";

const app = express();
const PORT = process.env.PORT || 8000;

// db connecttion
connection()
  .then(() => {
    /** ready to use. The `mongoose.connect()` promise resolves to mongoose
    instance. */
    app.listen(PORT, (error) => {
      return !error
        ? console.log(`server is running at http://localhost:${PORT}`)
        : console.log(error);
    });
  })
  .catch((error) => console.log(error));
app.get("/", (req, res) => res.send("<h2>Api is up</h2>"));
