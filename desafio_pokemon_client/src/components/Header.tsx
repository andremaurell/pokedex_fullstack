import React from 'react'
import Logo from '../assets/logo.svg'

const Header = () => {
    const [isSelected, setIsSelected] = React.useState('Home')

    const handleSelect = (value:string) => {
        setIsSelected(value)
    }


  return (
    <div className='bg-primary h-16'>
    <div className='flex justify-between items-center mx-20 py-2'>
        <img src={Logo} alt="Logo" className='w-28'/>

        <div className='flex gap-20 text-lg' >
            <a href="#" onClick={() => handleSelect('Home')} className={isSelected === 'Home' ? 'selected-navbar' : ''}>Home</a>
            <a href="#" onClick={() => handleSelect('Pokédex')} className={isSelected === 'Pokédex' ? 'selected-navbar' : ''}>Pokédex</a>
            <a href="#" onClick={() => handleSelect('Legendaries')} className={isSelected === 'Legendaries' ? 'selected-navbar' : ''}>Legendaries</a>
            <a href="#" onClick={() => handleSelect('Documentation')} className={isSelected === 'Documentation' ? 'selected-navbar' : ''}>Documentation</a>
        </div>
    </div>
    </div>
  )
}

export default Header