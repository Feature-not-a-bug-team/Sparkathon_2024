import { IProduct } from "@/types";
import { Schema, model, models } from "mongoose";

const productSchema = new Schema<IProduct>({
  name: {
    required: true,
    type: String,
  },
  price: {
    required: true,
    type: Number,
  },
  quantity: {
    required: true,
    type: Number,
  },
  code: {
    type: Number,
  },
},{timestamps:true});

export default models.Products || model("Products", productSchema);
