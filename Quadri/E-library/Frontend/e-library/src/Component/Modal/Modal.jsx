import React from 'react'
import {useDispatch} from "react-redux"
import { closeModalAction } from '../../Redux/Action/modal'

const Modal = () => {
    const dispatch = useDispatch()
    const closeModalHandler=()=>{
        dispatch(closeModalAction())
    }
  return (
    <div className="fixed top-0 left-0 w-screen overflow-hidden h-screen  bg-white z-40">
        <div  className=" w-8/12 h-[500px] rounded-md shadow-md border relative mx-auto bg-white mt-5 mb-8">
            <div className='w-[350px] h-[450px] mx-auto my-6 border shadow-2xl rounded-md'>
              <div className='w-[100px] h-[100px] mx-auto rounded-md bg-purple-400 my-4'></div>
              <div className='w-[250px] h-[250px] m-4 rounded-md bg-pink-600'></div>
              <div className='flex justify-end'>
                <button className='mr-4 border p-2 rounded-md text-white bg-green-600'>Borrow Book</button>
              </div>
            </div>
            <div onClick={closeModalHandler} className='absolute top-4 right-4 text-center font-bold text-red-700 w-[30px] h-[30px] rounded-full border-2 border-red-700 hover:bg-red-300 cursor-pointer'>
            X
        </div>
        </div>
       
    </div>
  )
}

export default Modal