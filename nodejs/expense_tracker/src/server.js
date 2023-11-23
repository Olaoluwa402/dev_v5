//load environment variables fro .env file
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import httpStatus from "http-status";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import colors from "colors";
import { dbConnect } from "./config/db.js";
import User from "./models/user/user.js";

const app = express();
const { NODE_ENV, PORT } = process.env;

//app general use
app.use(cors());
app.use(helmet());
if (NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.get("/", (req, res) => {
  res.status(httpStatus.OK).json({
    status: "success",
    message: "Welcome to Node Expense Tracker server",
  });
});

app.post("/users", async (req, res) => {
  //collect the data from req body
  const data = req.body;

  //import the db model and create the user
  const createdUser = await User.create({
    username: data.username,
    password: data.password,
    email: data.email,
  });

  res.status(httpStatus.CREATED).json({
    status: "success",
    data: createdUser,
  });
});

app.all("*", (req, res) => {
  res.status(httpStatus.NOT_FOUND).json({
    status: "error",
    message: "No Endpoint found",
  });
});

dbConnect()
  .then((res) => {
    console.log(`Database is connected`.bgGreen);
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
