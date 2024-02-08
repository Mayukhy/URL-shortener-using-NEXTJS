
import { NextResponse } from "next/server"
import connectDB from "@/app/libs/connectdb";
import User from "@/models/User";
import Url from "@/models/Url";


export async function PUT(request,{params}) {
  const {id} = params
  const body = await request.json()
  const {_id} = body

  await connectDB()
  try {

      const entry = await Url.findOneAndUpdate({
        smUrl:id
      },{
        $push: {
            visitHistory: {
              timestamp: Date.now(),
              user:_id
            },

          },
      }) 

    return NextResponse.json(entry)
  }
   catch (error) {
    return NextResponse.json('something went wrong');
  }
};

// deleting url
export async function DELETE(request,{params}) {
  const {id} = params
  await connectDB()
  try {

    await Url.findByIdAndDelete(id) 

    return NextResponse.json('deleted successfully')
  }
   catch (error) {
    return NextResponse.json('something went wrong');
  }
};


