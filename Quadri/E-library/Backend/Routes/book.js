import express from "express";
import validateMiddle from "../Middleware/Validation.js";
import { bookSchema } from "../Controller/Books/bookSchema.js";
import { Authorized, userVerification } from "../Middleware/Auth.js";
import {
  createBooks,
  deleteBook,
  getBook,
  getBooks,
  updateBook,
} from "../Controller/Books/Book.js";

const bookRouter = express.Router();

bookRouter
  .route("/")
  .post(
    validateMiddle(bookSchema),
    userVerification,
    Authorized(["librarian"]),
    createBooks
  )
  .get(getBooks);

bookRouter
  .route("/:id")
<<<<<<< HEAD
  .get(userVerification, Authorized(["librarian","regular","admin"]), getBook)
=======
  .get(userVerification, Authorized(["librarian,regular,admin"]), getBook)
>>>>>>> 96ce3306fc40d6631d282cb4da188104e6032160
  .patch(userVerification, Authorized(["librarian"]), updateBook)
  .delete(userVerification, Authorized(["librarian"]), deleteBook);
export default bookRouter;
