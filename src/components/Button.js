import React from 'react'

const Button = ({name}) => {
  return (
    <div>
      <button className='whitespace-nowrap rounded-lg bg-gray-200 px-5 py-2 text-sm hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600'>{name}</button>
    </div>
  )
}

export default Button
