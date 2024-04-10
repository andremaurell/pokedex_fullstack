import React from 'react'
import Header from '../components/Header'
import Pikachu_logo from '../img/Pikachu_logo.png'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='h-screen bg-primary'>
        <Header whoPage='Home' />
        <div className='bg-primary mt-20'>
          <div className='flex items-start justify-between'>
          <div className='flex flex-col items-start ml-40 gap-16'>
          <h1 className='text-7xl max-w-[30vw]'>Find all your 
          favorite Pokemon</h1>
          <p className=' max-w-[33vw] text-3xl'>You can know the type of Pokemon, its strengths, disadvantages and abilities</p>
          <Link to='/Pokedex'>
            <button className='bg-green-400 p-2 rounded-md border-b-[5px] border-green-600 hover:translate-y-[-5px] ease-in-out duration-300 hover:text-lg'>See Pokemons</button>
          </Link>
        </div>
        <div>
          <img src={Pikachu_logo} alt="Pikachu" className='max-h-[70vh] w-[50vw]'/>
        </div>
        </div>
        </div>

    </div>
  )
}

export default Home