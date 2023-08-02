import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StartMenu from "./pages/StartMenu"; // Update the import
import MoveList from "./pages/MoveList"; // Update the import
import Login from "./components/signup"; // Update the import

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<StartMenu />} /> {/* Use StartMenu component */}
      <Route path="/MoveList/:pokemonId" element={<MoveList />} /> {/* Use MoveList component */}
      <Route path ="/login" element = {<Login />} />
    </Routes>
  </BrowserRouter>
);

export default App;
