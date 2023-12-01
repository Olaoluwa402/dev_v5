import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import httpStatus from "http-status";
import morgan from "morgan";
import helmet from "helmet";

// creating app
const app = express();

const { PORT, NODE_ENV } = process.env;

// app general use
app.use(cors());
app.use(helmet());
app.use(express.json());

if (NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}`);
});

app.get("/", (req, res) => {
  try {
      res.status(httpStatus.OK).json({
        status: httpStatus.OK,
      message: "Welcome to my endpoint",
    });
  } catch (error) {
      console.log(error);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        error: "Internal server error",
      })
  }
});

app.get("*", (req, res) => {
    res.status(httpStatus.NOT_FOUND).json({
        status: httpStatus.NOT_FOUND,
        message: "No endpoint found",
   }) 
})
