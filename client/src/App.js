import React from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import StartMenu from "./pages/StartMenu";
import MoveList from "./pages/MoveList"; // Import the MoveList component
import Login from "./components/signup";
import Attack from "./pages/Attack";
import PokemonDetails from './components/PokemonDetails';

const App = () => (
  <BrowserRouter>
    <header>
      <Link to="/">HOME</Link>
    </header>
    <Routes>
      <Route path="/" element={<StartMenu />} />
      <Route path="/MoveList/:pokemonId" element={<MoveList />} />
      <Route path="/login" element={<Login />} />
      <Route path="/Attack" element={<Attack />} /> {/* Define the AttackPage route */}
      <Route path="/pokemon/:id" element={<PokemonDetails />} />
    </Routes>
  </BrowserRouter>
);

export default App;