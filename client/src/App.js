import React from "react";
import { BrowserRouter, Route, Routes, Link, Navigate } from "react-router-dom";
import StartMenu from "./pages/StartMenu";
import MoveList from "./pages/MoveList";
import Login from "./components/LoginForm";
import Attack from "./pages/Attack";
import PokemonDetails from './components/PokemonDetails';
import Auth from "./utils/auth";

const App = () => {
  const isUserAuthenticated = Auth.loggedIn();

  return (
    <BrowserRouter>
      <header>
        <Link to="/">HOME</Link>
      </header>
      <Routes>
        <Route path="/" element={isUserAuthenticated ? <StartMenu /> : <Navigate to="/login" />} />
        {isUserAuthenticated && (
          <>
            <Route path="/MoveList/:pokemonId" element={<MoveList />} />
            <Route path="/Attack" element={<Attack />} />
            <Route path="/pokemon/:id" element={<PokemonDetails />} />
          </>
        )}
        <Route path="/login" element={isUserAuthenticated ? <Navigate to="/" /> : <Login />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;

