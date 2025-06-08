import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    price: {
      type: Number,
      required: true,
    },
    salePrice: Number,
    isOnSale: {
      type: Boolean,
      default: false,
    },
    images: [String],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subcategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subcategory",
      required: true,
    },
    sizes: [
      {
        size: {
          type: String, // or Number, depending on your convention
        },
        stock: {
          type: Number,
          default: 0,
        },
      },
    ],
    tags: [String],
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
