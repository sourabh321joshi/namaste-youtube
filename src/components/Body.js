import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
import Head from './Head'

const Body = () => {
  return (
    <div className='min-h-screen bg-inherit text-inherit'>
      <Head />
      <div className='flex pt-2'>
        <Sidebar/>
        <Outlet/>
      </div>
    </div>
  )
}

export default Body
