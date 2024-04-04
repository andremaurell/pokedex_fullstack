import React from 'react';

interface Pokemon {
  image: string;
  name: string;
  types: string[];
}

const typesColors: { [key: string]: string } = {
  grass: 'bg-grass',
  fire: 'bg-fire',
  water: 'bg-water',
  ground: 'bg-ground',
  flying: 'bg-flying',
  electric: 'bg-electric',
  normal: 'bg-normal',
  fighting: 'bg-fighting',
  psychic: 'bg-psychic',
  rock: 'bg-rock',
  ice: 'bg-ice',
  bug: 'bg-bug',
  ghost: 'bg-ghost',
  dragon: 'bg-dragon',
  dark: 'bg-dark',
  steel: 'bg-steel',
  fairy: 'bg-fairy',
  poison: 'bg-poison',
};

const CardPokemon: React.FC<Pokemon> = ({ name, image, types }) => {
  let foundType = false;
  console.log(image)
  return (
    <div className='max-w-[21vw] h-[20vh] bg-[#F2F2F2]'>
      <a href="#" className='flex justify-between items-center'>
        <div className='flex flex-col px-6 gap-6 justify-between items-start max-w-[10vw]'>
          <h2>{name.charAt(0).toUpperCase() + name.slice(1)}</h2>
          <div className='flex flex-col gap-[0.4rem]'>
            {types.map((type) => (
              <h1 className={`px-1 rounded-md flex items-center justify-center ${typesColors[type]}`} key={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</h1>
            ))}
          </div>
        </div>
        {types.map((type) => {
          if (typesColors[type] && !foundType) {
            foundType = true;
            return (
              <div key={type} className={`w-[12vw] h-[20vh] flex items-center justify-center ${typesColors[type]}`}>
                <img src={image} alt={name} />
              </div>
            );
          }
          return null;
        })}
      </a>
    </div>
  );
};

export default CardPokemon;