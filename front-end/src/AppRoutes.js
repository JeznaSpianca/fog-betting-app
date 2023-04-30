import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Web3Home from "./pages/Web3Home";
import { DID } from './pages/Did';

function AppRoutes() {
  return (
    <Routes>
      <Route exact path="/" element={<Web3Home/>} />
      <Route exact path="/did" element={<DID/>} />
    </Routes>
  );
}

export default AppRoutes;
