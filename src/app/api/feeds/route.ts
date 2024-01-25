import Feed from "@/models/feedsModel";
import dbConnection from "@/utils/dbConnection";

import { NextResponse } from "next/server";

export const PUT = async (req: Request) => {
  try {
    await dbConnection();

    const { post_id, user_obj, isLiked } = await req.json();

    let updatedDocument: any = "";
    if (isLiked === true) {
      updatedDocument = await Feed.findOneAndUpdate(
        { _id: post_id },
        { $addToSet: { likedByUsers: user_obj } },
        { new: true }
      );
    } else {
      updatedDocument = await Feed.findOneAndUpdate(
        { _id: post_id },
        { $pull: { likedByUsers: { _id: user_obj._id } } },
        { new: true }
      );
    }


    if (updatedDocument) {
      return NextResponse.json({
        message: "api called",
        updatedDocument: updatedDocument,
        status: 200
      });
    } else {
      throw new Error("Some Error occurred in ")
    }

  } catch (err: any) {
    return NextResponse.json({
      error: err.message,
    });
  }
};