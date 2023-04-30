import { useState, useEffect } from 'react';

function App() {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    async function connectToMetamask() {
      if (typeof window.ethereum !== 'undefined') {
        // Connect to Metamask
        const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccounts([account]);

        // Create Web3 instance
        const Web3 = require('web3');
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);
      } else {
        console.log('Please install Metamask');
      }
    }

    connectToMetamask();
  }, []);

  return (
    <div>
      <h1>My dApp</h1>
      {web3 && (
        <p>
          Connected to web3 version {web3.version} with accounts:
          {accounts.map(account => (
            <span key={account}> {account}</span>
          ))}
        </p>
      )}
    </div>
  );
}

export default App;