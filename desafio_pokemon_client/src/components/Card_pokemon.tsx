import React from 'react'

interface Pokemon {
  image: string;
  name: string;
}
const Card_pokemon: React.FC<Pokemon> = ({ name, image }) => {
  console.log(image);
  return (
    <div className='max-w-[20vw] h-[20vh]  bg-[#F2F2F2]'>
      <a href="#" className='flex justify-between items-center'>
      <div className='flex flex-col p-5 justify-center items-start max-w-[10vw]'>
      <h2>{name}</h2>
      <h1>type</h1>
      </div>
      <div className='bg-primary w-[12vw] h-[20vh] flex items-center justify-center'>
      <img src= {image} alt={name} />
      </div>
      </a>
    </div>
  )
}

export default Card_pokemon