import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    username:{
        type:String,
        unique: true,
       },
    password: {
      type: String,
    },
    profile:{
        type:String,
        default:""
      },
      createdAt:{
         type:Date,
         default:new Date()
      },
  },
);

export default mongoose.models.User || mongoose.model("User", userSchema);