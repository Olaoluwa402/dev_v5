import mongoose from "mongoose";

export const dbConnect = () => {
  const conn = mongoose.connect(process.env.MONGO_URI);
  return conn;
};
