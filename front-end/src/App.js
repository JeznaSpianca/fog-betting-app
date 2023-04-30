import logo from './logo.svg';
import './App.css';
import Web3Home from "../src/pages/Web3Home";
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import Navigation from './Navigation';


function App() {
  return (
    <div>
      <Navigation/>
      <AppRoutes />
    </div>
  );
}

export default App;
