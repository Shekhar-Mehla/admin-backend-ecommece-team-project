import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
    },
    association: {
      type: String,
      required: true,
      trim: true,
    },
    expiry: {
      type: Date,
      required: true,

      expires: 0,
    },
  },
  {
    timestamps: true, // automatically adds createdAt and updatedAt
  }
);

const sessionCollection = mongoose.model("Session", sessionSchema);
export default sessionCollection;
