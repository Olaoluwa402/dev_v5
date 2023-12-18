import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { dbConnection } from "./config/db.js";
import httpStatus from "http-status";
import morgan from "morgan";
import colors from "colors";
import helmet from "helmet";
import bookRouter from "./routes/book.js"
import userRouter from "./routes/user.js"

// creating app
const app = express();

const { PORT, NODE_ENV } = process.env;

// app general usen
app.use(cors());
app.use(helmet());
app.use(express.json());

if (NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/books", bookRouter);
app.use("/users", userRouter)

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
    });
  }
});

app.get("*", (req, res) => {
  res.status(httpStatus.NOT_FOUND).json({
    status: httpStatus.NOT_FOUND,
    message: "No endpoint found",
  });
});

dbConnection()
  .then((res) => {
    console.log(`Database is connected successfully`.bgGreen);
    const port = NODE_ENV === "production" ? PORT : 5000;
    app.listen(port, (err) => {
      if (err) {
        console.log("server error", err);
        return;
      }

      console.log(
        `Server is runnig on port ${port} in ${NODE_ENV} environment`.green
      );
    });
  })
  .catch((err) => {
    console.log(`databse error: ${err}`.magenta);
  });
