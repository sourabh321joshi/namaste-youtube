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
    <div className='flex overflow-x-auto'>
     
     {buttonNames.map((name, index) => (
        <Button key={index} name={name} />
      ))}

    </div>
  )
}

export default ButtonList
