import mongoose from "mongoose";

async function connectDB() {
  //ATLAS_URI=mongodb+srv://linselin2828:yDPEYY8ntmQEEmtF@petcluster.mtzzu.mongodb.net/?retryWrites=true&w=majority&appName=petCluster
  const uri = process.env.ATLAS_URI; // Replace with your DB name

  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB using Mongoose");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1); // Exit if connection fails
  }
}

export default connectDB;