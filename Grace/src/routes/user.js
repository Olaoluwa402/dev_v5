import express from "express";
import {
  createUserSchema,
  loginSchema,
  getUserSchema,
} from "../controller/user/userSchema.js";
import { validationMiddleware } from "../middleware/validation.js";
import { verifyUser } from "../middleware/verifyUser.js";
import {
  getUser,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  getAllUser,
} from "../controller/user/user.js";
const router = express.Router();
router
  .route("/")
  .get(getAllUser)
  .post(validationMiddleware(createUserSchema), createUser);
router.route("/login").post(validationMiddleware(loginSchema), loginUser);
router
  .route("/:id")
  .get(validationMiddleware(getUserSchema, "QUERY"), getUser)
  .patch(verifyUser, updateUser) //protected route
  .delete(verifyUser, deleteUser); //protected route
export default router;

//
// // // This code defines an Express router for handling user-related routes in a web application. Let's break it down:
//
// 1. **Importing Dependencies:**
// //  - `express` is imported to create an instance of an Express router.
// // //  - `validationMiddleware` and `verifyUser` are middleware functions, likely used for request validation and user authentication.
// // // // //  - Several schema functions (`createUserSchema`, `loginUserSchema`, `getUserSchema`) are imported from the userSchema.js file. These schemas likely define the expected structure of data for different user-related operations.
// // // //  - CRUD operations for user management (`createUser`, `loginUser`, `getUsers`, `getUser`, `updateUser`, `deleteUser`) are imported from the user.js file.
//
// 2. **Router Initialization:**
// //  - An instance of an Express router is created using `const router = express.Router();`.
//
// 3. **Route Definitions:**
// // //  - Several routes are defined using the `router.route()` method, which creates route handlers for specific HTTP methods on a given path.
//  - **GET `/` (Get All Users):**
//  - Path: "/"
//  - Handler: `getUsers` function
//  - Middleware: None
// //  - This route is responsible for retrieving a list of all users.
//  - **POST `/` (Create User):**
//  - Path: "/"
//  - Handler: `createUser` function
// //  - Middleware: `validationMiddleware(createUserSchema)`
// // // // //  - This route is responsible for creating a new user. The `validationMiddleware` is used to validate the incoming data against the `createUserSchema` before processing the request.
//  - **POST `/login` (User Login):**
//  - Path: "/login"
//  - Handler: `loginUser` function
// //  - Middleware: `validationMiddleware(loginUserSchema)`
// // //  - This route is for user login. Similar to the create user route, it includes validation of incoming data using `loginUserSchema`.
//  - **GET `/:id` (Get User by ID):**
//  - Path: "/:id"
//  - Handler: `getUser` function
// //  - Middleware: `validationMiddleware(getUserSchema, "QUERY")`
// // // //  - This route is responsible for retrieving a user by their ID. The middleware validates the request query parameters against the `getUserSchema`.
//  - **PATCH `/:id` (Update User by ID):**
//  - Path: "/:id"
//  - Handler: `updateUser` function
//  - Middleware: `verifyUser`
// // // //  - This route is for updating a user by their ID. It is a protected route, as it requires user authentication using the `verifyUser` middleware.
//  - **DELETE `/:id` (Delete User by ID):**
//  - Path: "/:id"
//  - Handler: `deleteUser` function
//  - Middleware: `verifyUser`
// //  - Similar to the update route, this route is protected and requires user authentication.
//
// 4. **Exporting the Router:**
// //  - The router instance is exported as the default export of the module.
//
// // // // // In summary, this code sets up an Express router for user-related operations, includes middleware for request validation and user authentication, and defines routes for creating, retrieving, updating, and deleting users.
