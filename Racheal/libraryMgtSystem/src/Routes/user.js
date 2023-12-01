import express from "express";
import { validationMiddleware } from "../../middleware/validation.js";
import {
  createLibUser,
  loginUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
} from "../controller/user/user.js";

import {
  createLibUserSchema,
  loginUserSchema,
  getUserSchema,
} from "../controller/user/userSchema.js"
const router = express.Router();

