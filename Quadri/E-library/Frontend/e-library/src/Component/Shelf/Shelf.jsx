import React from "react";
import { GiBackForth } from "react-icons/gi";
import ToolTips from "../ToolTips/ToolTips";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getShelvesAction } from "../../Redux/Action/shelf";
import empty_shelf from "../Assets/Images/shelf.jpeg"
import ColorfulSpinner from "../ColofulSpinner/ColorfulSpinner";

const Shelf = () => {
  const dispatch = useDispatch();
  const { getShelves } = useSelector((state) => state);
  const { shelves, loading } = getShelves;

  useEffect(() => {
    dispatch(getShelvesAction());
  }, []);
  return (
    <div>
      <div className="overflow-scroll h-[80vh] rounded-lg border border-gray-200 shadow-md m-5">
        {loading ? (
          <div className="flex flex-col mt-[120px] justify-center items-center ">
            <ColorfulSpinner/>
            <h2 className="text-2xl font-semibold">Loading........</h2>
          </div>
        ):(
          <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-4 font-medium text-xl text-gray-900"
              >
                Title
              </th>
              <th
                scope="col"
                className="px-6 py-4 font-medium text-xl text-gray-900"
              >
                Author
              </th>
              <th
                scope="col"
                className="px-6 py-4 font-medium text-xl text-gray-900"
              >
                Category
              </th>
              <th
                scope="col"
                className="px-6 py-4 font-medium text-xl text-gray-900"
              >
                Published year
              </th>
              <th
                scope="col"
                className="px-6 py-4 font-medium text-xl text-gray-900"
              ></th>
            </tr>
          </thead>
          {shelves && shelves.length > 0 ? (
            shelves.map((item) => {
              return (
                <tbody
                  key={item._id}
                  className="divide-y divide-gray-100 border-t border-gray-100"
                >
                  <tr className="hover:bg-gray-50">
                    <th className="flex items-center gap-3 px-6 py-4 font-normal text-gray-900">
                      <div className="relative h-20 w-20">
                        <img
                          className="h-full w-full rounded-full bg-cover bg-center"
                          src={item.book.coverImage}
                          alt=""
                        />
                      </div>
                      <div className="text-sm">
                        <div className="font-semibold text-xl">
                          {item.book.title}
                        </div>
                      </div>
                    </th>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                        {/* <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span> */}
                        {item.book.author}
                      </span>
                    </td>
                    <td className="px-6 py-4">{item.category.name}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
                          {item.book.publicationYear}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <ToolTips text={"return to library"}>
                        <div className="flex justify-end cursor-pointer">
                          <GiBackForth className="text-black text-3xl" />
                        </div>
                      </ToolTips>
                    </td>
                  </tr>
                </tbody>
              );
            })
          ) : (
            <div className=" w-[400px] h-[400px] mx-auto">
              <div className="w-[300px] h-[300px] mx-auto">
                <img src={empty_shelf} className="w-full h-full bg-cover" alt="" />
              </div>
              <p className="font-2xl text-center pt-4 font-semibold">Your shelf is empty</p>
            </div>
          )}
        </table>
        )}
       
      </div>
    </div>
  );
};

export default Shelf;
