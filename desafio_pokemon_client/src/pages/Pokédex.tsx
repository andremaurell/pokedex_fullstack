import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Select from '../components/Select'
import Card_pokemon from '../components/Card_pokemon'
import axios from 'axios'

interface Pokemon {
  name: string;
  image: string;
  sprites: {
    front_default: string;
  };
}


const Pokédex = () => {
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/pokemons');
        setPokemonData(response.data);
      } catch (error) {
        console.error('Error fetching Pokemon data:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      <Header />
      <div className='flex flex-col justify-start px-20 gap-5'>
      <h1 className='flex items-center align-middle justify-center'>X Pokemons for you to choose your favorite</h1>
      <input className='w-[90vw] rounded-[30px] p-3 bg-[#F2F2F2] shadow-input outline-none px-10' type="search" 
      placeholder='Search your favorite Pokemon'
      />
      <Select />
      <div className='grid grid-cols-3 gap-10 justify-center pt-5'>
      {pokemonData.map((pokemon, index) => (
          <Card_pokemon key={index} name={pokemon.name} image={pokemon.image} />
        ))}
      </div>
      </div>
      </div>
  )
}

export default Pokédex