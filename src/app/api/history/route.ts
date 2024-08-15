import Historys from "../../../modal/history";
import dbConnect from "@/utils/mongo";
export async function GET() {
  await dbConnect();
  const historys = await Historys.find({});
  return Response.json(historys);
}
