//load environment variables fro .env file
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import httpStatus from "http-status";
import morgan from "morgan";
import cors from "cors";

const app = express();
const { NODE_ENV, PORT } = process.env;

//app general use
app.use(cors());
if (NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.get("/", (req, res) => {
  res.status(httpStatus.OK).json({
    status: "success",
    message: "Welcome to Node Expense Tracker server",
  });
});

app.all("*", (reqq, res) => {
  res.status(httpStatus.NOT_FOUND).json({
    status: "error",
    message: "No Endpoint found",
  });
});

const port = NODE_ENV === "production" ? PORT : 5000;

app.listen(port, (err) => {
  if (err) {
    console.log("server error", err);
    return;
  }

  console.log(`Server is runnig on port ${port} in ${NODE_ENV} environment`);
});
