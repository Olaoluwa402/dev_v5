import React from "react";
import { closeModalAction } from "../../Redux/Action/modal";
import { useDispatch, useSelector } from "react-redux";
import { deleteShelfAction, getShelvesAction } from "../../Redux/Action/shelf";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { DELETE_SHELF_RESET } from "../../Redux/Constants";
const PopUp = ({BookId}) => {
  const dispatch = useDispatch();
  const { deleteShelf } = useSelector((state) => state);
  const { shelf, success, error } = deleteShelf;
  const closeModalHandler = () => {
    dispatch(closeModalAction());
  };

  const deleteShelfHandler = (BookId) => {
    dispatch(deleteShelfAction(BookId));
    dispatch(getShelvesAction());
    dispatch(closeModalAction());
  };

  useEffect(() => {
    if (success) {
      toast.success("Book Removed from Shelf");
      dispatch({ type: DELETE_SHELF_RESET });
    }

    if (error) {
      toast.warn(`${error}`);
      setTimeout(() => {
        dispatch({ type: DELETE_SHELF_RESET });
      }, 3000);
    }
  }, [success, error]);
  return (
    <div className="fixed top-0 left-0 w-screen overflow-hidden h-screen bg-white z-40">
      <div className="w-[250px] h-[200px] top-[30%] bottom-[30%]  rounded-md shadow-md border relative mx-auto bg-white mt-5 mb-8">
        <p className="p-4 text-xl text-black font-inter">
          Are you sure you want to return book to Library ?
        </p>
        <div className="flex justify-center items-center mt-6 font-inter gap-4 text-white">
          <div
            onClick={() => deleteShelfHandler(BookId)}
            className="w-[100px] flex justify-center items-center p-2 cursor-pointer bg-green-500 rounded-md text-md"
          >
            yes!,return
          </div>
          <div
            onClick={() => closeModalHandler()}
            className="w-[100px] p-2 flex justify-center items-center cursor-pointer bg-red-500 rounded-md text-md"
          >
            cancel
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
