import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StartMenu from "./pages/StartMenu"; // Update the import
import MoveList from "./pages/MoveList"; // Update the import

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<StartMenu />} /> {/* Use StartMenu component */}
      <Route path="/MoveList/:pokemonId" element={<MoveList />} /> {/* Use MoveList component */}
    </Routes>
  </BrowserRouter>
);

export default App;
