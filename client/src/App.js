import React from "react";
import { BrowserRouter, Route, Routes, Link, Navigate } from "react-router-dom";
import StartMenu from "./pages/StartMenu";
import MoveList from "./pages/MoveList";
import Login from "./components/LoginForm";
import SignupForm from "./components/signup";
import Attack from "./pages/Attack";
import Battle from "./pages/BattleScreen";
import PokemonDetails from './components/PokemonDetails';
import Auth from "./utils/auth";
import "./assets/app.css";
const App = () => {
  const isUserAuthenticated = Auth.loggedIn();

  return (
    <BrowserRouter>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={() => window.location.href = "/"} className="home-btn">HOME</button>
        <button onClick={() => Auth.logout()} className="logout-btn">LOGOUT</button>
      </header>
      <Routes>
        <Route path="/" element={<StartMenu />} />

        <>
          <Route path="/" element={<StartMenu />} />
          <Route path="/MoveList/:pokemonId" element={<MoveList />} />
          <Route path="/Attack" element={<Attack />} />
          <Route path="/pokemon/:id" element={<PokemonDetails />} />
          <Route path="/Battle" element={<Battle />} />
          <Route path="/login" element={isUserAuthenticated ? <Navigate to="/" /> : <Login />} />
          <Route path="/signup" element={isUserAuthenticated ? <Navigate to="/" /> : <SignupForm />} />
        </>

        <Route path="/login" element={isUserAuthenticated ? <Navigate to="/" /> : <Login />} />
        <Route path="/signup" element={isUserAuthenticated ? <Navigate to="/" /> : <SignupForm />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;

