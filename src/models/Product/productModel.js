import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, // Product title
    description: String,
    slug: { type: String, required: true, index: true }, // Description text
    price: Number, // Normal price
    discountPrice: Number, // Discounted price if any
    images: [String], // Array of image URLs
    thumbnail: String, // Main thumbnail image
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    }, // Linked category (deepest subcategory)
    categoryPath: { type: String, required: true, index: true }, // Category materialized path, e.g. "/men/shoes/sneakers"
    stock: Number, // Stock count
    sizes: [String], // Available sizes
    colors: [String], // Available colors
    brand: String, // Brand name
    status: {
      type: String,
      enum: ["active", "inactive", "out-of-stock"],
      default: "active",
    }, // Availability status
    tags: [String], // Search tags
    ratings: Number, // Average rating
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }], // References to reviews
  },
  { timestamps: true }
);

const productCollection = mongoose.model("Product", productSchema);
export default productCollection;
