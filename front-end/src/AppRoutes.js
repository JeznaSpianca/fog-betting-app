import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Web3Home from "./pages/Web3Home";
import { DID } from './pages/Did';
import { Reputation } from "./pages/Reputation";
import { Betting } from "./pages/Betting";

function AppRoutes() {
  return (
    <Routes>
      <Route exact path="/" element={<Web3Home/>} />
      <Route exact path="/did" element={<DID/>} />
      <Route exact path="/reputation" element={<Reputation/>} />
      <Route exact path="/betting" element={<Betting/>} />
    </Routes>
  );
}

export default AppRoutes;
