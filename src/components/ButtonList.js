import React from 'react'
import Button from './Button'

const ButtonList = () => {
    const buttonNames = [
        "All",
        "Gaming",
        "News",
        "Entertainment",
        "Cricket",
        "Football",
        "Comedy",
        "Romance",
        "Funny",
        "Valentine",
        "Live",
        "Cooking",
        "Football",
       
      ];
  return (
    <div className='flex gap-2 overflow-x-auto px-2 py-1'>
     
     {buttonNames.map((name, index) => (
        <Button key={index} name={name} />
      ))}

    </div>
  )
}

export default ButtonList
