import BookModel from "../../Models/Book.js";
import httpStatus from "http-status";

export const createBooks = async (req, res) => {
<<<<<<< HEAD
  const { title, author, isbn, publicationYear, In_Stock,coverImage,categoryId } = req.body;
    
=======
  const { title, author, isbn, publicationYear, In_Stock } = req.body;

>>>>>>> 96ce3306fc40d6631d282cb4da188104e6032160
  try {
    const titleExist = await BookModel.findOne({ title: title, isbn: isbn });
    if (titleExist) {
      res.status(httpStatus.FORBIDDEN).json({
        status: "error",
        payload: "Book with the title already Exist",
      });
      return;
    }

    const book = await BookModel.create({
      title,
      author,
      isbn,
      publicationYear,
      In_Stock,
<<<<<<< HEAD
      coverImage,
      categoryId

=======
>>>>>>> 96ce3306fc40d6631d282cb4da188104e6032160
    });
    res.status(httpStatus.OK).json({
      status: "success",
      payload: book,
    });
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({
      status: "error",
      message: error.message,
    });
  }
};

export const getBooks = async (req, res) => {
  try {
<<<<<<< HEAD
    const books = await BookModel.find({}).populate({path:"categoryId",model:"Category"});
=======
    const books = await BookModel.find({});
>>>>>>> 96ce3306fc40d6631d282cb4da188104e6032160
    res.status(httpStatus.OK).json({
      status: "Success",
      payload: books,
    });
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({
      status: "error",
      message: error.message,
    });
  }
};

export const getBook = async (req, res) => {
  const bookId = req.params.id;
  try {
<<<<<<< HEAD
    const book = await BookModel.findById({ _id: bookId }).populate("category");
=======
    const book = await BookModel.findById({ _id: bookId });
>>>>>>> 96ce3306fc40d6631d282cb4da188104e6032160
    if (!book) {
      res.status(httpStatus.NOT_FOUND).json({
        status: "error",
        payload: `Book with the ID:${bookId} does not exist`,
      });
      return;
    }

    res.status(httpStatus.OK).json({
      status: "Success",
      payload: book,
    });
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({
      status: "error",
      message: error.message,
    });
  }
};

export const updateBook = async (req, res) => {
  const bookId = req.params.id;
  const { In_Stock } = req.body;

  try {
    const book = await BookModel.findById({ _id: bookId });
    if (!book) {
      res.status(httpStatus.NOT_FOUND).json({
        status: "error",
        payload: `Book with the ID:${bookId} does not exist`,
      });
      return;
    }

    const updatedBook = await BookModel.findByIdAndUpdate(
      { _id: bookId },
      { In_Stock: In_Stock },
      { new: true }
    );
    res.status(httpStatus.OK).json({
      status: "success",
      payload: updatedBook,
    });
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({
      status: "error",
      message: error.message,
    });
  }
};


export const deleteBook = async(req, res)=>{
    const bookId=req.params.id;
    try {
        const book = await BookModel.findById({ _id: bookId });
    if (!book) {
      res.status(httpStatus.NOT_FOUND).json({
        status: "error",
        payload: `Book with the ID:${bookId} does not exist`,
      });
      return;
    }
        await BookModel.findByIdAndDelete({_id:bookId})
        res.status(httpStatus.OK).json({
            status:"success" ,
            payload:`Deleted ${book}`
            
        })
    } catch (error) {
        res.status(httpStatus.BAD_REQUEST).json({
            status: "error",
            message: error.message,
          });
    }
}
