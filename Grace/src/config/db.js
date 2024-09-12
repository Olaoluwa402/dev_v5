import mongoose from "mongoose";
const str =
  "mongodb+srv://Olori:Grace2019@cluster0.iokvkjy.mongodb.net/task-app";
export const dbconnect = () => {
  const connect = mongoose.connect(str);
  return connect;
};
