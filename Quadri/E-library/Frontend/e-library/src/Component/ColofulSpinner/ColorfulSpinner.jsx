import React from 'react'

const ColorfulSpinner = () => {
  return (
    <div> 
<div className="animate-spin inline-block w-10 h-10 border-[3px] border-current border-t-transparent text-gray-800 rounded-full dark:text-white" role="status" aria-label="loading">
  <span className="sr-only">Loading...</span>
</div>

<div className="animate-spin inline-block w-10 h-10 border-[3px] border-current border-t-transparent text-yellow-1000 rounded-full" role="status" aria-label="loading">
  <span className="sr-only">Loading...</span>
</div>
<div className="animate-spin inline-block w-10 h-10 border-[3px] border-current border-t-transparent text-gray-400 rounded-full" role="status" aria-label="loading">
  <span className="sr-only">Loading...</span>
</div>
<div className="animate-spin inline-block w-10 h-10 border-[3px] border-current border-t-transparent text-pink-600 rounded-full" role="status" aria-label="loading">
  <span className="sr-only">Loading...</span>
</div>
<div className="animate-spin inline-block w-10 h-10 border-[3px] border-current border-t-transparent text-red-600 rounded-full" role="status" aria-label="loading">
  <span className="sr-only">Loading...</span>
</div>
<div className="animate-spin inline-block w-10 h-10 border-[3px] border-current border-t-transparent text-indigo-600 rounded-full" role="status" aria-label="loading">
  <span className="sr-only">Loading...</span>
</div>
<div className="animate-spin inline-block w-10 h-10 border-[3px] border-current border-t-transparent text-green-600 rounded-full" role="status" aria-label="loading">
  <span className="sr-only">Loading...</span>
</div>
<div className="animate-spin inline-block w-10 h-10 border-[3px] border-current border-t-transparent text-blue-600 rounded-full" role="status" aria-label="loading">
  <span className="sr-only">Loading...</span>
</div>
<div className="animate-spin inline-block w-10 h-10 border-[3px] border-current border-t-transparent text-orange-600 rounded-full" role="status" aria-label="loading">
  <span className="sr-only">Loading...</span>
</div>

<div className="animate-spin inline-block w-10 h-10 border-[3px] border-current border-t-transparent text-purple-600 rounded-full" role="status" aria-label="loading">
  <span className="sr-only">Loading...</span>
</div>
    </div>
  )
}

export default ColorfulSpinner