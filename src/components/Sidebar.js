import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const isMenuOpen =useSelector(store =>store.app.isMenuOpen);
        //Early return pattern
    if(!isMenuOpen) return <div className="hidden md:block md:w-16" />;

  return (
    <aside className='sticky top-16 hidden h-[calc(100vh-4rem)] w-56 overflow-y-auto border-r border-gray-200 p-4 md:block dark:border-gray-800'>
       <ul className="space-y-1">
        <li><Link className="block rounded-lg px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-800" to="/">Home</Link></li>
        <li className="rounded-lg px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-800">Shorts</li>
        <li className="rounded-lg px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-800">Subscriptions</li>
        <li className="rounded-lg px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-800">Live</li>
      </ul>

      <h1 className='pt-5 text-sm font-semibold text-gray-500'>Explore</h1>
      <ul className="mt-2 space-y-1">
        <li className="rounded-lg px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-800">Music</li>
        <li className="rounded-lg px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-800">Sports</li>
        <li className="rounded-lg px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-800">Gaming</li>
        <li className="rounded-lg px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-800">Movies</li>
      </ul>
      <h1 className='pt-5 text-sm font-semibold text-gray-500'>Library</h1>
      <ul className="mt-2 space-y-1">
        <li className="rounded-lg px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-800">History</li>
        <li className="rounded-lg px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-800">Playlists</li>
        <li className="rounded-lg px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-800">Your videos</li>
        <li className="rounded-lg px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-800">Watch later</li>
      </ul>
    </aside>
  )
}

export default Sidebar
