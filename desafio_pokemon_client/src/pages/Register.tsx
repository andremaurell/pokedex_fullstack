import { useState } from 'react'
import PasswordScreen from '../img/login_screen.png'
import userImage from '../assets/fi-sr-user.svg'
import passwordImage from '../assets/fi-sr-lock.svg'
import { Link } from 'react-router-dom'


const Password = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const handleSubmit = async (username:string, password:string) => {
        console.log('entrei', username, password)
      }
  return (
    <>
        <div className='flex overflow-hidden h-screen'>
      <div className='w-3/4 h-full'>
          <img className='w-[1000px]' src={PasswordScreen} alt="" />
      </div>
      <div className='flex flex-col items-center justify-center'>
      <h2 className="text-3xl font-bold mb-4 text-primary">SIGN UP</h2>
      <form className="flex flex-col space-y-4 items-center">
        <div className="flex">
          <label className="relative top-1 left-4">
            <img src={userImage} alt="" />
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="border-b-2 border-primary px-6 py-1 w-full text-black text-start outline-none"
          />
        </div>

        <div className="flex">
          <label className="relative top-1 left-4">
            <img src={passwordImage} alt="" className=''/>
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="border-b-2 border-primary px-6 py-1 w-full text-black text-start outline-none"
          />
        </div>

        <div className='flex flex-col items-center gap-2'>
        <button onClick={() => handleSubmit(username, password)} className='w-[90px] h-[48px] border-solid border-2 text-black border-primary hover:bg-primary hover:text-black hover:border-black ease-in-out duration-300' type="button">
          Sign Up
        </button>
        <span className='text-white'>or</span>
        <Link to={'/login'}>
        <button className='w-[90px] h-[48px] border-solid border-2 text-black border-black  hover:bg-primary hover:text-black ease-in-out duration-300' type="button">
          Sign In
        </button>
        </Link>
        </div>
      </form>
    </div>
    </div>
    </>
  )
}

export default Password