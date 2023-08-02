import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StartMenu from "./pages/StartMenu";
import MoveList from "./pages/MoveList";
import Login from "./components/signup";
import Attack from "./pages/Attack";


const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<StartMenu />} />
      <Route path="/MoveList/:pokemonId" element={<MoveList />} />
      <Route path="/login" element={<Login />} />
      <Route path="/Attack/:selectedMoves" element={<Attack />} />
    </Routes>
  </BrowserRouter>
);

export default App;
