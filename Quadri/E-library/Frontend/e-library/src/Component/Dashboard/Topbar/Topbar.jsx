import React from 'react'
import {CiSearch} from "react-icons/ci"
import {useDispatch} from "react-redux"
import { searchActions } from '../../../Redux/Action/Book'
const Topbar = () => {
const dispatch = useDispatch()
  const searchHandler=(changeValue)=>{
    dispatch(searchActions(changeValue))
  }
  const changeHandler=(e)=>{
    const {value}= e.target
    const changeValue = value.trim().replace(/" "/g, "")
    dispatch(searchHandler(changeValue))
  }
  return (
    <div className='w-[400px]  mx-auto rounded-md shadow-2xl hover:border-green-600 border-2 mt-4 flex justify-start gap-2 items-center'>
    <CiSearch className='text-4xl  text-green-600 border-r-4  rounded-md'/>
    <input type="text" name="" id="" placeholder='Search' onChange={changeHandler} className='w-full p-1 outline-none'/>
  </div>
  )
}

export default Topbar