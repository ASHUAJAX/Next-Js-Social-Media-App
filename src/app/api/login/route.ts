import { NextResponse } from "next/server";

export async function POST(req:Request){
 
    console.log(await req.json());

    return NextResponse.json({
        message:"api called"
    })
}