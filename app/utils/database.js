import mongoose from "mongoose";

let isConnected = false;

export const connectDataBase = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("✅ MongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URL, {
      dbName: "share_promt",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
  }
};
