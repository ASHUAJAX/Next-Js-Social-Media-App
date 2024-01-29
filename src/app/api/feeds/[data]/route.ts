import Feed from "@/models/feedsModel";
import dbConnection from "@/utils/dbConnection";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const GET = async (req: Request, { params }:any) => {
  try {
    await dbConnection();

    const { data } = params;

    let splitedData: string = data.split("&");
    let id: string = splitedData[0].split("id=")[1];
    let page: any = splitedData[1].split("page=")[1];
    let limit: any = splitedData[2].split("limit=")[1];

    let skip: number = (page - 1) * limit;

    
    const objectId = new mongoose.Types.ObjectId(id);
    let count: any = await Feed.find({ 'subscribedUsers': objectId }).countDocuments().exec();

   
    let feedsResp: any = await Feed.find({ 'subscribedUsers': objectId })
      .skip(skip)
      .limit(limit).exec();

     
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
        return NextResponse.json({
          feedsResp: feedsResp,
          message: "Data not found",
          count: count,
          limit: limit,
          status: 404,
        });
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



