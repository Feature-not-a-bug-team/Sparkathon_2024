import { History, HistoryType } from "@/types";
import { Schema, model, models } from "mongoose";

const HistorySchema = new Schema<History>(
  {
    productName: String,
    productCode: Number,
    type: {
      type: String,
      enum: HistoryType,
    },
    data: {
      oldPricec: Number,
      oldQUantity: Number,
      newPrice: Number,
      newQuantity: Number,
    },
  },
  { timestamps: true }
);

export default models.Historys || model("Historys", HistorySchema);
