import React from 'react'
import Sidebar from './Sidebar/Sidebar'
import Topbar from './Topbar/Topbar'
import { Outlet } from 'react-router'


const Dashboard = () => {
  return (
       <div className='m-0 p-0'>
        <div className='fixed top-0 left-0 bottom-0 w-[200px] shadow-2xl'>
            <Sidebar/>
        </div>
          <Topbar/>
        <main className='fixed top-20 w-[75%] shadow-2xl shadow-current right-14 h-[85vh]'>
          <Outlet/>
        </main>
       </div>
  )
}

export default Dashboard