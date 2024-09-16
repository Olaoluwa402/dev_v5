import mongoose from "mongoose";

export const dbConnection = () => {
    const conn = mongoose.connect(process.env.MONGO_URI)
    return conn
}