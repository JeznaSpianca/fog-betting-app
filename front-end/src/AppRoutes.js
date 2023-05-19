import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Web3Home from "./pages/Web3Home";
import { DID } from './pages/Did';
import { Reputation } from "./pages/Reputation";
import { Betting } from "./pages/Betting";
import { CreatePools } from "./pages/CreatePools";
import { Forum } from "./pages/Forum";
import { Thread } from "./pages/Thread";

function AppRoutes() {
  return (
    <Routes>
      <Route exact path="/" element={<Web3Home/>} />
      <Route exact path="/did" element={<DID/>} />
      <Route exact path="/reputation" element={<Reputation/>} />
      <Route exact path="/create" element={<CreatePools/>} />
      <Route exact path="/betting" element={<Betting/>} />
      <Route exact path="/forum" element={<Forum/>} />
      <Route path="/thread/:threadId" element={<Thread/>} />
    </Routes>
  );
}

export default AppRoutes;
