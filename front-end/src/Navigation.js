import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <div className='left'>
      <nav>
      <p className='b'>Navigate to:</p>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/did">DID</Link></li>
        <li><Link to="/create">CreatePools</Link></li>
        <li><Link to="/reputation">Reputation</Link></li>
        <li><Link to="/betting">Betting</Link></li>
        <li><Link to="/forum">Forum</Link></li>
      </ul>
    </nav>
    </div>
  );
}

export default Navigation;
