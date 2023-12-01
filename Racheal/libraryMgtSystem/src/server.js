import express from "express";
import httpStatus from "http-status";
import colors from "colors";
import dotenv from "dotenv";
dotenv.config({})
import {dbConnect} from "./Config/db.js"
const app = express();

const { NODE_ENV, PORT } = process.env;
if (NODE_ENV === "development") {
  app.use(morgan("dev"));
}

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

dbConnect().then((res) => {
  console.log("Database is connected")
  const port = NODE_ENV === "production" ? PORT : 6000;
app.listen(port, (error) => {
  if (error) {
    console.log("server error", error);
    return;
  }
  console.log(`App is listening on port ${port} in ${NODE_ENV} mode`.bgGreen);
});
}).catch((error)=> {
  console.log(`database error ${error}`);
})