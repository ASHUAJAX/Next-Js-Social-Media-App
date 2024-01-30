
import Feed from "@/models/feedsModel";
import User from "@/models/userModel";
import dbConnection from "@/utils/dbConnection";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { uName, pass } = await req.json();

    await dbConnection();

    if (!uName || !pass) {
      throw new Error(
        "Please fill the form!Username and password is must be filled"
      );
    } else {
      const isExistResp: any = await User.findOne({
        userName: { $regex: new RegExp(uName, "i") },
      });

      if (isExistResp) {
        if (isExistResp.password === pass) {
          
          //inserting feeds
          // const feedsArr = [];
        

          // for (let i = 1; i < 100; i++) {
          //   let feedObj: object = {
          //     subscribedUsers: [isExistResp._id],
          //     adminProfileImg: "https://thepreviewapp.com/wp-content/uploads/2021/08/how-to-use-instagram-collab-feature.jpeg",
          //     postImg : "https://spiritualquotes.in/wp-content/uploads/2023/02/2-1024x1024.jpg",
          //     adminProfileName: "idioticfeeds" + i,
          //     likes: i+i,
          //     comments: "10",
          //     description: "TRANSCENDENCE: Trailer Out Now | In a world gripped by technology, our choices are steering youth towards an uncertain horizon. See what their future might hold",
          //   }
          //   feedsArr.push(feedObj);
          // }
          
    
          // const savedUser = await Feed.insertMany(feedsArr);

          //  console.log(savedUser);

          return NextResponse.json({
            message: "User loginned successfully!",
            user: isExistResp,
            status: 200,
          });
          
        } else {
          throw new Error("Invalid credentials!");
        }
      } else {
        throw new Error("User not exist");
      }
    }
  } catch (err: any) {
    return NextResponse.json({
      error: err.message,
    });
  }
}
