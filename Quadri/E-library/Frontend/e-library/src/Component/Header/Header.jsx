import React from 'react'
import Logo from "../Assets/Images/Logo.jpeg";
const Header = () => {
  return (
    <div className=" sticky top-0 z-20 border-b-2 bg-white flex justify-start items-center  gap-2 pb-2 pt-4 pl-8">
        <img
          src={Logo}
          alt=""
          className="w-[50px] h-[50px] bg-cover rounded-full"
        />
        <h2 className="font-inter font-bold text-3xl">
          E-Li<span className="text-purple-500">bra</span>ry
        </h2>
      </div>
  )
}

export default Header