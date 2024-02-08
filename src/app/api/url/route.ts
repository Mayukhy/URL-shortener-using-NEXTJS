import { NextResponse } from "next/server";
import connectDB from "@/app/libs/connectdb";
import Url from "@/models/Url";
import shortid from 'shortid';

interface UrlData {
  name: string;
  actualUrl: string;
  userId: string;
}

//getting all urls
export async function GET(request: any): Promise<NextResponse> {
  await connectDB();
  try {
    const urls = await Url.find().sort({created_at:-1});
    return NextResponse.json(urls);
  } catch (error) {
    return NextResponse.json([]);
  }
}

//creating new url sc
export async function POST(request: any): Promise<NextResponse> {
  const body = await request.json();
  const { name, actualUrl, userId } = body;
  await connectDB();
  const shortID = shortid();
  try {
    const newUrl = await Url.create({
      smUrl: shortID,
      name: name,
      actualUrl: actualUrl,
      userId: userId
    });
    return NextResponse.json(newUrl);
  } catch (error) {
    console.log(error);
    return NextResponse.json('something went wrong');
  }
}

//updating url data
export async function PUT(request: any): Promise<NextResponse> {
  const body = await request.json();
  const { name, actualUrl, id } = body;
  await connectDB();

  try {
    const updatedUrl = await Url.findByIdAndUpdate(id,{
      name: name,
      actualUrl: actualUrl,
    },
    {new:true}
    );
    return NextResponse.json(updatedUrl);
  } catch (error) {
    console.log(error);
    return NextResponse.json('something went wrong');
  }
}







