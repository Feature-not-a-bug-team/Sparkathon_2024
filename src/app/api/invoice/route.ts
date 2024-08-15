import { IInvoice, IProduct } from "@/types";
import Invoices from "../../../modal/invoice";
import Product from "../../../modal/product";

import dbConnect from "@/utils/mongo";
export async function GET() {
  await dbConnect();
  const allInvoices = await Invoices.find({});
  return Response.json(allInvoices);
}
export async function POST(request: Request) {
  await dbConnect();
  const invoice = (await request.json()) as IInvoice;
  const Invoicess = await Invoices.find({});
  await Promise.all(
    invoice.products.map(async (product) => {
      await Product.findOneAndUpdate(
        {
          _id: product._id,
        },
        {
          $inc: { quantity: -product.quantity },
        }
      );
    })
  );
  const updateProdcuts = await Product.find({});
  invoice.invoiceNumber = Invoicess.length + 1;
  const newInvoice = await Invoices.create(invoice);
  const updatedInvoice = await Invoices.findOneAndUpdate(
    {
      _id: newInvoice._id,
    },
    {
      ...newInvoice,
      invoiceNumber: Invoicess[0] ? Invoicess[0].invoiceNumber + 1 : 1,
    },
    { new: true }
  );
  return Response.json({ newInvoice: updatedInvoice, updateProdcuts });
}
export async function PUT(request: Request) {
  await dbConnect();
  const body = (await request.json()) as {
    newIInvoice: IInvoice;
  };
  const oldInvoice = await Invoices.findById({ _id: body.newIInvoice._id });
  const updatedProducts = oldInvoice.products.map((product: IProduct) => {
    const productFromNew = body.newIInvoice.products.find(
      (p) => p._id == product._id
    );
    if (productFromNew) {
      product.quantity = product.quantity - productFromNew.quantity;
    }
    return product;
  });

  const updatedProductsFromDB = await Promise.all(
    updatedProducts.map(async (pr: IProduct) => {
      return await Product.findOneAndUpdate(
        { _id: pr._id },
        {
          $inc: {
            quantity: pr.quantity,
          },
        },
        { new: true }
      );
    })
  );

  const updatedInvoice = await Invoices.findOneAndUpdate(
    { _id: oldInvoice._id },
    body.newIInvoice
  );
  return Response.json({
    updatedInvoice,
    updatedProductsFromDB,
  });
}
