import express from "express";
import validateMiddle from "../Middleware/Validation.js";
import { addToShelfSchema } from "../Controller/Shelf/ShelfSchema.js";
import { userVerification } from "../Middleware/Auth.js";
import { addToShelf, getShelfs } from "../Controller/Shelf/Shelf.js";

const shelfRouter = express.Router();

shelfRouter
  .route("/")
  .post(validateMiddle(addToShelfSchema), userVerification, addToShelf).get(userVerification,getShelfs);


  export default shelfRouter