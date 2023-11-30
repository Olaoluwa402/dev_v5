import express from "express";
import httpStatus from "http-status";
import colors from "colors";
import dotenv from "dotenv";
dotenv.config()
const app = express();

const { NODE_ENV, PORT } = process.env;
app.get("/", (req, res) => {
  try {
    res
      .status(httpStatus.OK)
      .json({
        status: "Success",
        message: "Welcome to my Library Management System",
      });
  } catch (error) {
    console.log(error.message);
    res.status(httpStatus[404]).send(error.message);
  }
});
const port = NODE_ENV === " production" ? PORT : 3000;
app.listen(port, (error) => {
  if (error) {
    console.log(error);
    return;
  }
  console.log(`App is listening on port ${port} in ${NODE_ENV} mode`.bgGreen);
});
