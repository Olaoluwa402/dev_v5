import Book from "../../model/books/book.js";
import httpStatus from "http-status";

export const createBook = async (req, res) => {
    const data = req.body;
    const {userId} = req.params

    try {
      
         const bookExist = await Book.findOne({ title: data.title })
        if (bookExist) {
            res.status(httpStatus.BAD_REQUEST).json({
                status: "error",
                payload: "Title already exist"
            })
            return
        }
      const createdBook = await Book.create({
          title: data.title,
          author: data.author,
    })
      
    res.status(httpStatus.CREATED).json({
      status: "success",
      data: createdBook,
    });
    } catch (error) {
        console.log(error,"aaaaaaaaa");
    // res.status(httpStatus.BAD_REQUEST).json({
    //   status: "error",
    //   message: "error.message",
    // });
  }
};

