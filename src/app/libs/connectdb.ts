import mongoose, { ConnectionOptions } from "mongoose";

const connectDB = async (): Promise<void> => {
  if (mongoose.connections[0].readyState) return;

  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectionOptions);
    console.log("Mongo Connection successfully established.");
  } catch (error) {
    throw new Error("Error connecting to Mongoose");
  }
};

export default connectDB;