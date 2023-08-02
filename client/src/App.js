import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StartMenu from "./pages/StartMenu";
import MoveList  from "./pages/MoveList";
import Login from "./components/signup";


const App = () => (
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartMenu />} />
        <Route path="/MoveList/:pokemonId" element={<MoveList />} />
        <Route path="/login" element={<Login />} />
      </Routes>
  </BrowserRouter>
);

export default App;
