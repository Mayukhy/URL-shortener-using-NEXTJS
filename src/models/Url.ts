import mongoose from "mongoose";
import isURL from 'validator/lib/isURL';
const { Schema } = mongoose;

const urlSchema = new Schema(
  {
    smUrl: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      unique: true,
      required: true,
    },
    actualUrl: {
      type: String,
      unique: true,
      required: true,
      validate(value){
        if (!isURL(value)) {
           throw new Error('Url is not valid') 
        }
        }
    },
    userId:{
        type:String,
        required: true,
       },
       
       visitHistory:{
        type:[{ 
            timestamp: { type: Number },
            user: {type : String}
        }]
      },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

export default mongoose.models.Url || mongoose.model("Url", urlSchema);


