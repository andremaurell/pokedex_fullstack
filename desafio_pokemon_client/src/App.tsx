import Home from "./pages/Home"
import Legendary from "./pages/Legendary"
import Login from "./pages/Login"
import Pokédex from "./pages/Pokédex"
import Register from "./pages/Register"
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  return (
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
  )
}

export default App
