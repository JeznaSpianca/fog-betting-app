import React from 'react';
import web3 from '../web3';

// Use web3 to interact with the Ethereum network
export function DID() {
  
    async function neki() {
        console.log(await window.ethereum.request({ method: 'eth_requestAccounts' }));
    }
    neki();
    return (
      <div>
        <h1>My dApp</h1>
      </div>
    );
  }
  
  