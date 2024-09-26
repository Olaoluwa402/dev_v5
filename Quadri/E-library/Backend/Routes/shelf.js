import express from "express";
import validateMiddle from "../Middleware/Validation.js";
import { addToShelfSchema } from "../Controller/Shelf/ShelfSchema.js";
import { userVerification } from "../Middleware/Auth.js";
import { addToShelf, deleteShelf, getShelfs } from "../Controller/Shelf/Shelf.js";

const shelfRouter = express.Router();

shelfRouter
  .route("/")
  .post(validateMiddle(addToShelfSchema), userVerification, addToShelf).get(userVerification,getShelfs);

  shelfRouter.route("/:id").delete(deleteShelf)



  export default shelfRouter