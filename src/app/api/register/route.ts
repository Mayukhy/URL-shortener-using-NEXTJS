import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import connectDB from "@/app/libs/connectdb";
import User from "@/models/User";

interface Request {
  json: () => Promise<{
    email: string;
    username: string;
    password: string;
  }>;
}

interface UserResponse {
  email: string;
  username: string;
  password: string;
}

export async function POST(request: Request): Promise<NextResponse> {
  const { email, username, password } = await request.json();
  if (!email || !username || !password) {
    return new NextResponse("missing info", { status: 400 });
  }
  const hashedPassword = await bcrypt.hash(password, 12);
  await connectDB();
  const user: UserResponse = await User.create({
    email,
    username,
    password: hashedPassword,
  });

  return NextResponse.json(user);
}