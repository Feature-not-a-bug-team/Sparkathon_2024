import Product from "@/modal/product";
import { HistoryType, IProduct } from "@/types";
import dbConnect from "@/utils/mongo";
import Historys from "../../../../modal/history";

export async function POST(request: Request) {
  await dbConnect();
  const body = (await request.json()) as {
    name: string;
    price: number;
    quantity: number;
  };
  const products = await Product.find({});
  const product: IProduct = {
    name: body.name,
    price: body.price,
    quantity: body.quantity,
    code: products.length + 1,
  };
  const createdProduct = await Product.create(product);
  const newHistoryEntry = await Historys.create({
    productName: body.name,
    productCode: products.length + 1,
    type: HistoryType.Created,
    data: {
      oldPricec: 0,
      oldQUantity: 0,
      newPrice: body.price,
      newQuantity: body.quantity,
    },
  });
  return Response.json({ createdProduct, newHistoryEntry });
}
