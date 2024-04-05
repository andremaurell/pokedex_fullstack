// Objective: Page to show the legendary pokemons.

import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import Card_pokemon from '../components/Card_pokemon'
import axios from 'axios'


interface Pokemon {
    name: string;
    image: string;
    sprites: {
      front_default: string;
    };
  }
  

const Legendary = () => {
    const [legendaryData, setLegendaryData] = useState<Pokemon[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/legendaries`);
                setLegendaryData(response.data);
                console.log('Legendary Data:', legendaryData);
            } catch (error) {
                console.error('Error fetching Legendary Pokemon data:', error);
            }
        }
        fetchData();
    }, []);
  return ( 
    <div>
        <Header />
        <div className='grid grid-cols-3 gap-10 justify-center pt-5'>
        {legendaryData.map((pokemon, index) => (
            <div>
            <img src={pokemon.image} alt="" />
            <h2> {pokemon.name}</h2>
            </div>
        ))}
        </div>

    </div>
   )
}

export default Legendary