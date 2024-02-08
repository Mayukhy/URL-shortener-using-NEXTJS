
import { NextResponse } from "next/server"
import connectDB from "@/app/libs/connectdb";
import User from "@/models/User";

export async function GET(request,{params}) {
  const {mail} = params
  await connectDB()
  try {
    const user = await User.findOne({email:mail})
    return NextResponse.json(user)
  }
   catch (error) {
    return [];
  }
};