import React from 'react'

const Spinner = () => {
  return (
    <div className='w-full'>
    {/* <p className="mb-2 text-sm font-medium text-gray-500">Spinner with text</p> */}
    <button className=" w-full flex justify-center items-center gap-x-4 rounded-xl bg-green-600 px-8 py-3 font-medium text-white">
      <svg className="h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <span className='text-center'>Loading...</span>
    </button>
  </div>
  )
}

export default Spinner