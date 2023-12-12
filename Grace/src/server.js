import dotenv from "dotenv";
dotenv.config();

import express from "express";
import morgan from "morgan";
import httpStatus from "http-status";
import cors from "cors";
import colors from "colors";
import helmet from "helmet";
import CategoryRoute from "./routes/category.js";
import { dbconnect } from "./config/db.js";
import userRouter from "./routes/user.js";
import incomeExpenseRoute from "./routes/IncomeExpenseRoute.js";
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
app.use("/user", userRouter);
app.use("/categories", CategoryRoute);
app.use("/expenses", incomeExpenseRoute);

app.get("/", (req, res) => {
  res.status(httpStatus.OK).json({
    status: "success",
    payload: "Welcome to Node libary",
  });
});
app.all("*", (req, res) => {
  res.status(httpStatus.NOT_FOUND).json({
    status: "error",
    payload: "No Endpoint found",
  });
});

dbconnect()
  .then((res) => {
    console.log(`Database is connected`.bgGreen);
    const port = NODE_ENV === "production" ? PORT : 5000;
    app.listen(port, (error) => {
      if (error) {
        console.log("server error", error);
      }
      console.log(
        `server is running on port ${port} in ${NODE_ENV} environment`.green
      );
    });
  })
  .catch((error) => {
    console.log(`database error: ${error}`.magenta);
  });

//
// // // This code sets up a basic Node.js server using the Express framework for building web applications. Let's go through it step by step:
//
// 1. **Environment Variables:**
// //  - The code uses the `dotenv` library to load environment variables from a `.env` file.
// //  - `dotenv.config()` loads the variables into the `process.env` object.
//
// 2. **Importing Dependencies:**
// // // // // //  - Various dependencies are imported, including `express` for the web framework, `http-status` for HTTP status codes, `morgan` for logging, `cors` for enabling Cross-Origin Resource Sharing, `helmet` for securing HTTP headers, and others.
//
// 3. **Database Connection:**
// // //  - The `dbConnect` function is imported from a file named `db.js`. This function likely establishes a connection to a database.
//
// 4. **Express App Initialization:**
// //  - An Express app is created using `const app = express();`.
//
// 5. **Middleware Setup:**
// //  - Middleware functions are used to set up the application.
//  - `cors()` allows cross-origin resource sharing.
// //  - `express.json()` parses incoming requests with JSON payloads.
// //  - `helmet()` helps secure the application by setting various HTTP headers.
// // //  - In development mode (`NODE_ENV === "development"`), `morgan("dev")` is used for logging.
//
// 6. **Routing:**
// // // // //  - Three routes (`UserRoute`, `CategoryRoute`, and `IncomeExpenseRoute`) are imported from separate files and mounted on the app with specific base paths ("/users", "/categories", "/expenses").
// //  - An additional route handles the root path ("/") and returns a welcome message as JSON.
//
// 7. **404 Not Found Route:**
// //  - An `app.all("*", ...)` route catches all other routes and returns a 404 Not Found response.
//
// 8. **Database Connection and Server Startup:**
// //  - The `dbConnect` function is called, and once the database connection is established:
//  - A success message is logged to the console.
// // // //  - The server is configured to listen on a specified port (`PORT` from environment variables) or default to port 5000 in development.
// //  - A message is logged indicating the server is running, including the environment and port.
//
// 9. **Error Handling:**
// // //  - Any errors during database connection or server startup are caught and logged to the console.
//
// // // // // // Overall, this code is a basic setup for a Node.js server using Express, incorporating middleware for common functionalities, setting up routes, and connecting to a database. It seems to be part of a larger project, possibly a web application for tracking expenses.
