import mongoose, { Schema, Document, models } from "mongoose";
import { Product } from "@/types/Product";

const ProductSchema: Schema = new Schema({
  id: { type: Number, required: true, unique: true },
  hero: { type: String },
  heroes: { type: [String], required: true },
  title: { type: String, required: true },
  currentPrice: { type: String, required: true },
  previousPrice: { type: String },
  discount: { type: String },
  desc: { type: String, required: true },
  colors: { type: [String], required: true },
  sizes: { type: [String], required: true },
  averageRating: { type: Number },
  sortingCategory: { type: String },
});

const CatalogProduct =
  models.CatalogProduct ||
  mongoose.model<Document & Product>("CatalogProduct", ProductSchema);

export default CatalogProduct;
