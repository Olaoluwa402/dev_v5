import React from "react";
import { useEffect } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getBookAction, getBooksAction } from "../../Redux/Action/Book";
import { openModalAction } from "../../Redux/Action/modal";
import Modal from "../Modal/Modal";
import Loader from "../Loader/Loader";

const Library = () => {
  const dispatch = useDispatch();
  const { getBooks, modal } = useSelector((state) => state);
  const { book,loading } = getBooks;
  const { records, hasNextPage, hasPrevPage, nextPage, prevPage } = book;
  const { isModalOpen } = modal;
  useEffect(() => {
    dispatch(getBooksAction());
  }, []);

  const getNextBooks = (page) => {
    dispatch(getBooksAction(page));
  };

  const openModalHandler = (bookId) => {
    dispatch(getBookAction({ bookId: bookId }));
    dispatch(openModalAction());
  };

  return (
    // <div>
    <div className=" relative flex flex-wrap mb-5">
      <div className="w-full max-w-full px-3 mb-6 mx-auto">
        <div className="relative flex-[1_auto] flex flex-col break-words min-w-0  rounded-[.95rem] bg-white shadow-2xl m-5">
          <div className="relative flex flex-col min-w-0 break-words  rounded-2xl border-stone-200 bg-light/30">
            <div className="px-9 pt-5 flex justify-between items-stretch flex-wrap min-h-[70px] pb-0 bg-transparent">
              <h3 className="flex flex-col items-start justify-center m-2 ml-0 font-medium text-xl/tight text-dark">
                <span className="mr-3 font-semibold font-inter text-dark ">
                  Library
                </span>
              </h3>
            </div>

            <div className="flex-auto block py-8 pt-6 px-9">
              <div className="overflow-x-auto">
                <table className="w-full my-0 align-middle text-dark border-neutral-200">
                  <thead className="align-bottom shadow-2xl">
                    <tr className="font-semibold  text-[0.95rem] text-secondary-dark">
                      <th className="pb-3 text-start text-green-600  min-w-[175px] ">
                        TITLE
                      </th>
                      <th className="pb-3 text-center text-green-600 min-w-[100px]">
                        AUTHOR
                      </th>
                      <th className="pb-3 text-center text-green-600 min-w-[120px]">
                        ISBN
                      </th>
                      <th className="pb-3 pr-12 text-center text-green-600 min-w-[175px]">
                        CATEGORY
                      </th>

                      <th className="pb-3 text-end min-w-[50px] text-green-600">
                        DETAILS
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {isModalOpen && <Modal />}
                    {records && records.length > 0 ? (
                      records.map((item) => {
                        return (
                          <tr
                            key={item._id}
                            className="border-b border-dashed last:border-b-0"
                          >
                            <td className="p-3 pl-0">
                              <div className="flex items-center">
                                <div className="relative inline-block shrink-0 rounded-2xl me-3">
                                  <img
                                    src={item.coverImage}
                                    className="w-[50px] h-[50px] bg-cover inline-block shrink-0 rounded-2xl"
                                    alt=""
                                  />
                                </div>
                                <div className="flex flex-col justify-start">
                                  <a
                                    href="javascript:void(0)"
                                    className="mb-1 font-semibold transition-colors duration-200 ease-in-out text-lg/normal text-secondary-inverse hover:text-primary"
                                  >
                                    {" "}
                                    {item.title}{" "}
                                  </a>
                                </div>
                              </div>
                            </td>
                            <td className="p-3 pr-0 text-start">
                              <span className="font-semibold text-light-inverse text-md/normal">
                                {item.author}
                              </span>
                            </td>
                            <td className="p-3 pr-0 text-center">
                              <span className="text-center align-baseline inline-flex px-2 py-1 mr-auto items-center font-semibold text-base/none text-success bg-success-light rounded-lg">
                                {item.isbn}{" "}
                              </span>
                            </td>
                            <td className="p-3 pr-12 text-center">
                              <span className="text-center align-baseline inline-flex px-4 py-3 mr-auto items-center font-semibold text-[.95rem] leading-none text-primary bg-primary-light rounded-lg">
                                {" "}
                                {item.categoryId.name}{" "}
                              </span>
                            </td>

                            <td className="p-3 pr-0 text-end">
                              <button
                                onClick={openModalHandler}
                                className="ml-auto relative text-green-800 font-bold bg-light-dark hover:text-primary flex items-center h-[25px] w-[25px] text-base leading-normal text-center align-middle cursor-pointer rounded-2xl transition-colors duration-200 ease-in-out shadow-none border-0 justify-center"
                              >
                                <span className="flex items-center justify-center p-0 m-0 leading-none shrink-0 bg-green-600 hover:bg-green-300 w-[25px] h-[25px] rounded-full">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-4 h-4"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                                    />
                                  </svg>
                                </span>
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <h2>Library is Empty</h2>
                    )}

                    <tr className="border-b border-dashed last:border-b-0">
                      <td className="p-3 pl-0"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      {loading ? (
        <Loader/>
      ) : (
        <div className=" absolute right-10 bottom-12 flex justify-between w-[100px] h-[40px] cursor-pointer">
        {hasPrevPage ? (
          <div onClick={()=>getNextBooks(prevPage)} className="w-[40px] h-[40px] text-green-600 hover:bg-green-600 hover:text-white  flex justify-center items-center border border-green-800 rounded-full">
            <FaAngleLeft className="text-2xl" />
          </div>
        ) : (
          ""
        )}
        
        {hasNextPage ? (
          <div
            onClick={() => getNextBooks(nextPage)}
            className="w-[40px] h-[40px] text-green-600 hover:bg-green-600 hover:text-white  flex justify-center items-center border border-green-800 rounded-full"
          >
            <FaAngleRight className="text-2xl" />
          </div>
        ) : (
          ""
        )}
      </div>
      )}
      
    </div>
  );
};

export default Library;
