import express from "express";
import colors from "colors";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config({});
import morgan from "morgan";
import httpStatus from "http-status";
import { config } from "./Config/config.js";
import { dbConnect } from "./Config/db.js";
import userRouter from "./Routes/user.js";
import bookRouter from "./Routes/book.js";
import categoryRouter from "./Routes/category.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static("public"))

app.use("/user", userRouter)
app.use("/book", bookRouter)
app.use("/category",categoryRouter)
app.get("/", (req, res) => {
  res.status(httpStatus.OK).json({
    status: "success",
    payload: "Welcome! to E-Library App",
  });
});

app.all("*", (req, res) => {
  res.status(httpStatus.NOT_FOUND).json({
    status: "error",
    payload: "endpoint not defined",
  });
});
dbConnect()
  .then((result) => {
    console.log("connected to Database".bgGreen);

    const port = config.env === "production" ? config.env : 3000;

    app.listen(port, (err) => {
      if (err) {
        console.log(`error:${err}`.bgRed);
        return;
      }
      console.log(
        `app is running on port ${port} in ${config.env} mode`.bgGreen
      );
    });
  })

  .catch((err) => console.log(`dbError:${err}`.bgRed));
