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
          return NextResponse.json({
            message: "User loginned successfully!",
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
