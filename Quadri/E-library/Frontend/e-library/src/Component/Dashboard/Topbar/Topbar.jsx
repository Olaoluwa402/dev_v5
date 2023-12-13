import React from 'react'
import {CiSearch} from "react-icons/ci"
const Topbar = () => {
  return (
    <div className='w-[400px]  mx-auto rounded-md shadow-2xl hover:border-green-600 border-2 mt-4 flex justify-start gap-2 items-center'>
    <CiSearch className='text-4xl  text-green-600 border-r-4  rounded-md'/>
    <input type="text" name="" id="" placeholder='Search' className='w-full p-1 outline-none'/>
  </div>
  )
}

export default Topbar