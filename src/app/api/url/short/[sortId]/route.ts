import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/libs/connectdb";
import Url from "@/models/Url";

interface Params {
  sortId: string;
}

export async function GET(request: NextRequest, { params }: { params: Params }): Promise<NextResponse> {
  const { sortId } = params;
  await connectDB();
  try {
    const url = await Url.findOne({ smUrl: sortId });
    if (url) {
      NextResponse.redirect(url.actualUrl);
    }
    return NextResponse.redirect(url.actualUrl);
  } catch (error) {
    return NextResponse.json('something went wrong');
  }
}