import express from "express"
// import { validationMiddleware } from "../middleware/validation.js"
import { createBook } from "../controllers/Books/books.js"
// import { createBookSchema } from "../controllers/Books/bookSchema.js"

const bookRouter = express.Router()

bookRouter.route("/")
.post(createBook)
    
export default bookRouter