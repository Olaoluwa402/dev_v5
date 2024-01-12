import React from 'react'

const Loader = () => {
  return (
    <div>
    {/* <p className="mb-2 text-sm font-medium text-gray-500">Reloader</p> */}
    <div className="py-2 text-green-600 absolute bottom-12 right-20">
      <svg className="h-8 w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
        <g>
          <path d="M50 15A35 35 0 1 0 74.74873734152916 25.251262658470843" fill="none" stroke="currentColor" strokeWidth="12"></path>
          <path d="M49 3L49 27L61 15L49 3" fill="currentColor"></path>
          <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
        </g>
      </svg>
    </div>
  </div>
  )
}

export default Loader