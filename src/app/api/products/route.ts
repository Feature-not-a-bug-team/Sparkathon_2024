import Product from "@/modal/product";
import dbConnect from "@/utils/mongo";

export async function GET(request: Request) {
  try {
    await dbConnect();
    const products = await Product.find({});
    return Response.json(products);
  } catch (error) {
    console.log(error);
  }
}
