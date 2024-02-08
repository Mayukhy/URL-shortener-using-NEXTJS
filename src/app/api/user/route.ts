
import { NextResponse } from "next/server"
import connectDB from "@/app/libs/connectdb";
import User from "@/models/User";

export async function GET(request) {
  await connectDB()
  try {
    const users = await User.find()
    return NextResponse.json(users)
  }
   catch (error) {
    return [];
  }
};