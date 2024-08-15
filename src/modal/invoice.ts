import { IInvoice } from "@/types";
import { Schema, model, models } from "mongoose";

const invoiceSchema = new Schema<IInvoice>(
  {
    user: {
      name: String,
      address: String,
      mobileNo: String,
      whatsAppNo: String,
      nameOfLayout: String,
      district: String,
      tahasil: String,
      mauza: String,
      surveyNo: String,
      plotNo: String,
      araji: String,
    },
    paylmentType: String,
    products: [
      {
        name: String,
        quantity: String,
        price: Number,
        code: Number,
        _id: String,
      },
    ],
    invoiceNumber: Number,
    totalPricec: Number,
  },
  { timestamps: true }
);

export default models.Invoices || model("Invoices", invoiceSchema);
