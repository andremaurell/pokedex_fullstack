import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Select from '../components/Select'
import Card_pokemon from '../components/Card_pokemon'
import axios from 'axios'

interface Pokemon {
  types: string[];
  name: string;
  image: string;
  stats: {
    name: string;
    base_stat: number;
  }[];
  sprites: {
    front_default: string;
  };
}


const Pokédex = () => {
  const [filter, setFilter] =useState('')
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
  const [selectedTypes, setSelectedTypes] = useState('');
  
  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value)
  }

  const handleTypeChange = async (types: string[]) => {
    setSelectedTypes(types.join(', '));
    console.log('type', types)
    const response = await axios.get('http://localhost:3000/api/pokemons');
    const filtered = response.data.filter((pokemon: { types: string | string[]; }) => {
      if (types.length === 0) {
        return true;
      }
      return types.some((type) => pokemon.types.includes(type));
    });
    setPokemonData(filtered);
  }
  const filtered = pokemonData.filter((pokemon) => pokemon.name.includes(filter));


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/pokemons');
        console.log('aquifoi', response.data)
        setPokemonData(response.data);
      } catch (error) {
        console.error('Error fetching Pokemon data:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      <Header whoPage='Pokédex' />
      <div className='flex flex-col justify-start px-20 gap-5'>
      <h1 className='flex items-center align-middle justify-center'>{`${pokemonData.length} Pokemons for you to choose your favorite`}</h1>
      <input className='w-[90vw] rounded-[30px] p-3 bg-[#F2F2F2] shadow-input outline-none px-10' type="search" 
      placeholder='Search your favorite Pokemon'
      onChange={handleFilter}
      />
      <Select onTypeChange={handleTypeChange}/>
      <div className='grid grid-cols-3 gap-10 justify-center pt-5'>
      {filtered.map((pokemon, index) => (
          <Card_pokemon key={index} name={pokemon.name} image={pokemon.image} types={pokemon.types} stats={pokemon.stats} />
        ))}
      </div>
      </div>
      </div>
  )
}

export default Pokédex