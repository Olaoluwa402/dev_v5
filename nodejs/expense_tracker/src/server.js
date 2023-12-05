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
import UserRoute from "./routes/User.js";
import CategoryRoute from "./routes/Category.js";
import IncomeExpenseRoute from "./routes/Expense.js";

const app = express();
const { NODE_ENV, PORT } = process.env;

//app general use
app.use(cors());
app.use(express.json());
app.use(helmet());
if (NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//routes
app.use("/users", UserRoute);
app.use("/categories", CategoryRoute);
app.use("/expenses", IncomeExpenseRoute);

app.get("/", (req, res) => {
  res.status(httpStatus.OK).json({
    status: "success",
    message: "Welcome to Node Expense Tracker server",
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
