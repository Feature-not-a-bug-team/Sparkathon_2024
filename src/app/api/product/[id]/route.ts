import Product from "@/modal/product";
import { HistoryType, IProduct } from "@/types";
import dbConnect from "@/utils/mongo";
import Historys from "../../../../modal/history";
export async function PUT(request: Request) {
  await dbConnect();
  const body = (await request.json()) as {
    name: string;
    price: number;
    quantity: number;
    code: number;
    id: string;
  };

  const product: IProduct = {
    name: body.name,
    price: body.price,
    quantity: body.quantity,
    code: body.code,
  };

  const productFromDb = await Product.findById({ _id: body.id });

  const updatedProduct = await Product.findOneAndUpdate(
    { _id: body.id },
    product,
    { new: true }
  );

  const editedHistoryEntry = await Historys.create({
    productName: body.name,
    productCode: body.code,
    type: HistoryType.Edited,
    data: {
      oldPricec: productFromDb.price,
      oldQUantity: productFromDb.quantity,
      newPrice: body.price,
      newQuantity: body.quantity,
    },
  });
  return Response.json({ updatedProduct, editedHistoryEntry });
}
