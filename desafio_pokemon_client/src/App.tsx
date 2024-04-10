import Home from "./pages/Home"
import Legendary from "./pages/Legendary"
import Login from "./pages/Login"
import Pokédex from "./pages/Pokédex"
import Register from "./pages/Register"
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <div className="max-h-screen h-screen max-w-screen-2xl">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/pokedex" element={<Pokédex />} />
        <Route path="/legendaries" element={<Legendary />} />




      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
