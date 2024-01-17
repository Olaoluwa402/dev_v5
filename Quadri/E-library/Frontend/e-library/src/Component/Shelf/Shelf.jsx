import React from 'react'
import {GiReturnArrow} from "react-icons/gi"

const Shelf = () => {
  return (
    <div>
      
<div className="overflow-auto rounded-lg border border-gray-200 shadow-md m-5">
  <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
    <thead className="bg-gray-50">
      <tr>
        <th scope="col" className="px-6 py-4 font-medium text-xl text-gray-900">Title</th>
        <th scope="col" className="px-6 py-4 font-medium text-xl text-gray-900">Author</th>
        <th scope="col" className="px-6 py-4 font-medium text-xl text-gray-900">Category</th>
        <th scope="col" className="px-6 py-4 font-medium text-xl text-gray-900">Published year</th>
        <th scope="col" className="px-6 py-4 font-medium text-xl text-gray-900"></th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-100 border-t border-gray-100">
      <tr className="hover:bg-gray-50">
        <th className="flex items-center gap-3 px-6 py-4 font-normal text-gray-900">
          <div className="relative h-20 w-20">
            <img
              className="h-full w-full rounded-full bg-cover bg-center"
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
            {/* <span className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white"></span> */}
          </div>
          <div className="text-sm">
            <div className="font-semibold text-xl">Steven Jobs</div>
            {/* <div className="text-gray-400">jobs@sailboatui.com</div> */}
          </div>
        </th>
        <td className="px-6 py-4">
          <span
            className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600"
          >
            {/* <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span> */}
            Active bomb
          </span>
        </td>
        <td className="px-6 py-4">Product Designer</td>
        <td className="px-6 py-4">
          <div className="flex gap-2">
            <span
              className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600"
            >
              Design
            </span>
            {/* <span
              className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-600"
            >
              Product
            </span>
            <span
              className="inline-flex items-center gap-1 rounded-full bg-violet-50 px-2 py-1 text-xs font-semibold text-violet-600"
            >
              Develop
            </span> */}
          </div>
        </td>
        <td className="px-6 py-4">
          <div className="flex justify-end cursor-pointer">
            <GiReturnArrow className='text-black text-3xl'/>
            
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</div>
    </div>
  )
}

export default Shelf