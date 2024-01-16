import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModalAction } from "../../Redux/Action/modal";
import { addToShelfAction } from "../../Redux/Action/shelf";
import { toast } from "react-toastify";
import { CREATE_SHELF_RESET } from "../../Redux/Constants";
import Spinner from "../Spinner/Spinner";


const Modal = () => {
  const { getBook, addToShelf } = useSelector((state) => state);
  const { book } = getBook;
  const { success, error, loading } = addToShelf;

  console.log(book, "single");
  // const {records} = book
  const dispatch = useDispatch();
  const closeModalHandler = () => {
    dispatch(closeModalAction());
  };

  const addToShelfHandler = (bookId, categoryId) => {
    dispatch(addToShelfAction({ bookId: bookId, categoryId: categoryId }));
  };

  useEffect(() => {
    if (success) {
      toast.success(`Book added to your shelf`);
      dispatch({ type: CREATE_SHELF_RESET });
    }

    if (error) {
      toast.warn(`${error}`);
      setTimeout(() => {
        dispatch({ type: CREATE_SHELF_RESET });
      }, 2000);
    }
  }, [success, error]);
  return (
    <div className="fixed top-0 left-0 w-screen overflow-hidden h-screen  bg-white z-40">
      <div className=" w-8/12 h-[500px] rounded-md shadow-md border relative mx-auto bg-white mt-5 mb-8">
        <div
          key={book ? book._id : ""}
          className="w-[350px] h-[450px] mx-auto my-6 border shadow-2xl rounded-md"
        >
          <div className="w-[100px] h-[100px] mx-auto rounded-md my-4">
            <div className="w-full h-full">
              <img
                src={book ? book.coverImage : ""}
                alt=""
                className="w-full h-full rounded-md"
              />
            </div>
          </div>
          <div className="w-[280px] h-[250px] m-4 rounded-md bg-green-50">
            <div className="p-2 w-full h-full font-inter font-semibold text-sm">
              <div className="p-2 gap-2 flex justify-start">
                <p>Title :</p>
                <p>{book ? book.title : ""}</p>
              </div>
              <div className="p-2 gap-2 flex justify-start">
                <p>Author :</p>
                <p>{book ? book.author : ""}</p>
              </div>
              <div className=" p-2 gap-2 flex justify-start">
                <p>ISBN :</p>
                <p>{book ? book.isbn : ""}</p>
              </div>
              <div className="p-2 gap-2 flex justify-start">
                <p>Category :</p>
                <p>{book ? book.categoryId.name : ""}</p>
              </div>
              <div className="p-2 gap-2 flex justify-start">
                <p>In_Stock :</p>
                <p>{book ? book.In_Stock : ""}</p>
              </div>
              <div className="p-2 gap-2 flex justify-start">
                <p>Publication Year :</p>
                <p>{book ? book.publicationYear : ""}</p>
              </div>
            </div>
          </div>
          <div className="flex w-[200px] m-4">
            {loading ? (
              <Spinner />
            ) : (
              <button
                onClick={() => addToShelfHandler(book._id, book.categoryId._id)}
                className="mr-4 p-2 rounded-xl text-white font-inter font-semibold bg-green-600 hover:bg-green-300 hover:text-black"
              >
                Borrow Book
              </button>
            )}
          </div>
        </div>
        <div
          onClick={closeModalHandler}
          className="absolute top-4 right-4 text-center font-bold text-red-700 w-[30px] h-[30px] rounded-full border-2 border-red-700 hover:bg-red-300 cursor-pointer"
        >
          X
        </div>
      </div>
    </div>
  );
};

export default Modal;
