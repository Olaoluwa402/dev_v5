import shelfModel from "../../Models/Shelf.js";
import httpStatus from "http-status";

export const addToShelf = async (req, res) => {
  const userId = req.user._id;
  const data = req.body;

  try {
    const shelfItems = await shelfModel
      .findOne({ user: userId, book: data.bookId })
      .populate([
        { path: "book", model: "Book" },
        { path: "category", model: "Category" },
      ]);
    if (shelfItems) {
      res.status(httpStatus.BAD_REQUEST).json({
        status: "error",
        message: `Book already in your shelf`,
      });
      return;
    }

    const shelfBooks = await shelfModel.create({
      user: userId,
      book: data.bookId,
      category: data.categoryId,
    });
    res.status(httpStatus.CREATED).json({
      status: "success",
      payload: shelfBooks,
    });
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({
      status: "error",
      payload: error.message,
    });
  }
};

export const getShelfs = async (req, res) => {
  const userId = req.user._id;
  const search = req.query.search;
  console.log(userId, "iddd");

  try {
    const shelves = await shelfModel.find({ user: userId }).populate([
      { path: "book", model: "Book" },
      { path: "category", model: "Category" },
    ]);
    res.status(httpStatus.OK).json({
      status: "success",
      payload: shelves,
    });
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({
      status: "error",
      payload: error.message,
    });
  }
};

export const deleteShelf = async (req, res) => {
  const shelfId = req.params.id;

  try {
    const shelf = await shelfModel.findById({ _id: shelfId });
    if (!shelf) {
      res.status(httpStatus.BAD_REQUEST).json({
        status: "error",
        payload: "Book does not exist",
      });
      return;
    }

    await shelfModel.findByIdAndDelete({ _id: shelfId });
    res.status(httpStatus.OK).json({
      status: "success",
      message: `Deleted Shelf with id ${shelfId}`,
    });
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({
      status: "error",
      payload: error.message,
    });
  }
};
