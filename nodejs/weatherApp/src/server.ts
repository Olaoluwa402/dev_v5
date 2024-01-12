<<<<<<< HEAD
//load environment variables fro .env file
import dotenv from "dotenv";
dotenv.config();

import express, {
  Application,
  json,
  urlencoded,
  Response,
  Request,
} from "express";
import httpStatus from "http-status";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";

import colors from "colors";

import WeatherRoute from "./routes/weather";
// import CategoryRoute from "./routes/Category.js";
// import IncomeExpenseRoute from "./routes/Expense.js";

const app: Application = express();
const { NODE_ENV, PORT } = process.env;

//app general use
app.use(cors());
app.use(json());
app.use(helmet());
app.use(express.static("public")); //set folder for public access of files and images
if (NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//routes
app.use("/weather", WeatherRoute);
// app.use("/categories", CategoryRoute);
// app.use("/expenses", IncomeExpenseRoute);

app.get("/", (req: Request, res: Response) => {
  res.status(httpStatus.OK).json({
    status: "success",
    message: "Welcome to Node Expense Tracker server",
  });
});

app.all("*", (req: Request, res: Response) => {
  res.status(httpStatus.NOT_FOUND).json({
    status: "error",
    message: "No Endpoint found",
  });
});
const port: number = PORT ? +PORT : 8001;
app.listen(port, () => {
  console.log(
    `Server is runnig on port ${port} in ${NODE_ENV} environment`.green
  );
});
=======
import express from "express";
>>>>>>> f7ef0af43db34e2a6bec86b3736b9ca2e056ab66
