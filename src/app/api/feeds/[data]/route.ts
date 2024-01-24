import Feed from "@/models/feedsModel";
import dbConnection from "@/utils/dbConnection";
import { NextResponse } from "next/server";

export const GET = async (req: Request, { params }) => {
  try {
    await dbConnection();

    const { data } = params;

    let splitedData: string = data.split("&");
    let id: string = splitedData[0].split("id=")[1];
    let page: any = splitedData[1].split("page=")[1];
    let limit: any = splitedData[2].split("limit=")[1];

    let skip: number = (page - 1) * limit;

    let count: any = await Feed.find({ user_id: id }).countDocuments();

    let feedsResp: any = await Feed.find({ user_id: id })
      .skip(skip)
      .limit(limit);
console.log("Api Called");
    if (feedsResp) {
      if (feedsResp.length !== 0) {
        return NextResponse.json({
          feedsResp: feedsResp,
          message: "api called",
          count: count,
          limit: limit,
          status: 200,
        });
      } else {
        throw new Error("Feeds not found!");
      }
    } else {
      throw new Error("Some error occured in fetching feeds!");
    }
  } catch (err: any) {
    return NextResponse.json({
      error: err.message,
    });
  }
};



