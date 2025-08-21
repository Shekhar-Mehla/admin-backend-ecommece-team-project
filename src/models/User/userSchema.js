import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
    fName: {
      type: String,
      required: true,
      trim: true,
    },
    lName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    address: {
      street: { type: String, trim: true },
      city: { type: String, trim: true },
      state: { type: String, trim: true },
      postCode: { type: Number, trim: true },
      country: { type: String, trim: true },
    },
    address: {
      type: String,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    refreshJWT: {
      type: String,
    },
    profilePicture: {
      type: String, // store as URL or path
    },
    authProvider: {
      type: String, // e.g., 'google', 'facebook', 'local'
      default: "local",
    },
    providerId: {
      type: String, // for OAuth
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // automatically adds createdAt and updatedAt
  }
);

const userCollection = mongoose.model("User", userSchema);
export default userCollection;
