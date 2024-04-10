import { useState } from 'react'
import Logo from '../assets/logo.svg'
import { Link } from 'react-router-dom';

interface HeaderProps {
    whoPage: string
}

const Header = ({ whoPage }: HeaderProps) => {
    const [isSelected, setIsSelected] = useState('Home')

    const handleSelect = async (value:string) => {
       await setIsSelected(value)
       whoPage = value
    }


  return (
    <div className='bg-primary h-16'>
    <div className='flex justify-between items-center mx-20 py-2'>
        <img src={Logo} alt="Logo" className='w-28'/>

        <div className='flex gap-20 text-lg' >
          <Link to='/Home'>
            <a onClick={() => handleSelect('Home')} className={whoPage === 'Home' ? 'selected-navbar' : ''}>Home</a>
          </Link>
          <Link to='/Pokedex'>
            <a onClick={() => handleSelect('Pokédex')} className={whoPage === 'Pokédex' ? 'selected-navbar' : ''}>Pokédex</a>
          </Link>
          <Link to='/Legendaries'>
            <a onClick={() => handleSelect('Legendaries')} className={whoPage === 'Legendaries' ? 'selected-navbar' : ''}>Legendaries</a>
          </Link>
          <Link to='/Documentation'>
            <a onClick={() => handleSelect('Documentation')} className={whoPage === 'Documentation' ? 'selected-navbar' : ''}>Documentation</a>
          </Link>
        </div>
    </div>
    </div>
  )
}

export default Header