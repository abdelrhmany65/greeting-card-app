import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Customize from "./pages/Customize";

const App = () => {
  return (
    <Routes>
      
      <Route path="/" element={<Home />} />
      <Route path="/customize/:id" element={<Customize />} />
    </Routes>
  );
};

export default App;
