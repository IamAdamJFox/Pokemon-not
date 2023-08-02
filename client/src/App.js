import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/StartMenu";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>} />
    </Routes>
  </BrowserRouter>
);
export default App;