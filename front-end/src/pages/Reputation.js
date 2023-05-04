import React, { useState } from "react";
import web3 from '../web3';
const contracts = require("../contracts.js");

// Use web3 to interact with the Ethereum network
export function Reputation() {
  
    async function neki() {
        console.log(await window.ethereum.request({ method: 'eth_requestAccounts' }));
    }
    const [text, setText] = useState("");

    const handleClick = () => {
        console.log(text);
    };

    const [address, setAddress] = useState("");
    const [score, setScore] = useState("");
    const [status, setStatus] = useState("");


    const [address_get, setAddress_get] = useState("");
    const [reputation, setReputation] = useState("");
    const [status_get, setStatus_get] = useState("");

    const getCheckReputation = async (event) => {
        event.preventDefault();
    
        const contractAddress = contracts.reputation_contract.address;
        const contractABI = contracts.reputation_contract.abi;
    
        const contract = new web3.eth.Contract(contractABI, contractAddress);
        const reputation = await contract.methods.getReputation(address_get).call();
    
        setReputation(reputation);
        setStatus("");
      };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      const contractAddress = contracts.reputation_contract.address;
      const contractABI = contracts.reputation_contract.abi;
  
      const contract = new web3.eth.Contract(contractABI, contractAddress);
      const accounts = await web3.eth.getAccounts();
  
      setStatus("Submitting transaction...");
  
      try {
        await contract.methods.addReputation(address, score).send({ from: accounts[0] });
        setStatus("Transaction successful!");
      } catch (error) {
        console.error(error);
        setStatus("Transaction failed.");
      }
    };

    return (
      <div>
        <h1>My dApp</h1>

        <form onSubmit={handleSubmit}>
            <label>
                Ethereum Address:
                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
            </label>
            <label>
                Score:
                <input type="number" value={score} onChange={(e) => setScore(e.target.value)} />
            </label>
            <button type="submit">Submit</button>
            <p>{status}</p>
        </form>
        <h1>Get reputation of a user</h1>

      <form onSubmit={getCheckReputation}>
        <label>
          Ethereum Address:
          <input type="text" value={address_get} onChange={(e) => setAddress_get(e.target.value)} />
        </label>
        <button type="submit">Check Reputation</button>
      </form>
      {status_get && <p>{status_get}</p>}
      {reputation && <p>Reputation: {reputation}</p>}
      </div>
      
    );
  }
  
  