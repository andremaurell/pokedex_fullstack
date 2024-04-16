import React from 'react'
import { Pokemon } from './Card_pokemon'
import { typesColors } from './Card_pokemon';

interface Stat {
  name: string;
  base_stat: number;
}

const Card_legendary: React.FC<Pokemon> = ({ name, image, stats, types }) => {
  let foundType = false;
  console.log('stats', stats)
  
  return (
    <div className='bg-white h-[27rem] w-80 max-h-[28rem] rounded-lg'>
      <div className='flex flex-col items-center'>
      {types.map((type) => {
          if (typesColors[type] && !foundType) {
            foundType = true;
            return (
              <div key={type} className={`w-full h-[28vh] flex items-center justify-center ${typesColors[type]} rounded-lg`}>
                <img className='max-h-56 h-52' src={image} alt={name} />
              </div>
            );
          }
          return null;
        })}
        <h1 className='mr-2 font-semibold'>{name.charAt(0).toUpperCase() + name.slice(1)}</h1>
        </div>
        <div className='pl-2'>
          <ul>
            {stats.map((stat, index) => (
              <li key={index}>{stat.name.charAt(0).toUpperCase() + stat.name.slice(1)}: {stat.base_stat}</li>
            ))}
          </ul>
        </div>
        <div className='flex flex-col gap-[0.4rem] w-full h-full mt-2'>
            {types.map((type) => (
              <h1 className={`px-1 rounded-md flex items-center justify-center ${typesColors[type]}`} key={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</h1>
            ))}
          </div>
      </div>
  )
}

export default Card_legendary