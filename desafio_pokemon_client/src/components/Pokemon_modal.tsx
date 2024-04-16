import { useState } from "react"
import { Pokemon } from './Card_pokemon'
import { typesColors } from './Card_pokemon';


const Pokemon_modal: React.FC<Pokemon> = ({ name, image, types, stats }) => {
    console.log('stats', stats)
    return (
        
        <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center'>
            <div className='bg-white p-10 rounded-lg'>
                <h1>{name}</h1>
                <img src={image} alt={name} />
                <h2>{types}</h2>
                <ul>
                {stats.map((stat, index) => (
                <li key={index}>{stat.name}: {stat.base_stat}</li>
                ))}
                </ul>
            </div>
        </div>
    )
}

export default Pokemon_modal