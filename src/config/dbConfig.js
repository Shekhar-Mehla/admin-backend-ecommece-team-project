import mongoose from "mongoose";
const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    error.message = "database connection is failed";
    console.log(error.message);
  }
};
export default connection;
