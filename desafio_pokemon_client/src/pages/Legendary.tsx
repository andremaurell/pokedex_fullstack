// Objective: Page to show the legendary pokemons.

import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import axios from 'axios'
import Card_legendary from '../components/Card_legendary'
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"



interface Pokemon {
    name: string;
    image: string;
    stats: string[];
    types: string[];
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
                console.log('response', response.data)
            } catch (error) {
                console.error('Error fetching Legendary Pokemon data:', error);
            }
        }
        fetchData();
    }, []);
  return ( 
    <div>
        <div className=' bg-slate-800 h-screen max-h-screen'>
        <Header whoPage = 'Legendaries' />
        <h1 className='flex items-center justify-center py-5 text-4xl font-semibold text-white'>Legendaries</h1>
        <div className='flex items-center justify-center pt-5'>    
        <Carousel showArrows={true} autoPlay infiniteLoop centerMode interval={5000} width={440} className=' m-auto'>
            {legendaryData.map((pokemon, index) => (
                <div key={index} className="px-4">
                    <Card_legendary name={pokemon.name} image={pokemon.image} stats={pokemon.stats} types={pokemon.types} />
                </div>
            ))}
        </Carousel>
        </div>
        </div>
    </div>
   )
}

export default Legendary