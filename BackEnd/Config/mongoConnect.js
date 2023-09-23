import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const mongoDBConnect = async () => {
  try {
    await mongoose.connect(process.env.dbconnect, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected...");
  } catch (err) {
    console.log("Failed to Connect...", err);
  }
};

export default mongoDBConnect;
