import React, { useState } from "react";
import web3 from '../web3';
const contracts = require("../contracts.js");

// Use web3 to interact with the Ethereum network
export function Forum() {
  
    async function getWith() {
        const accounts = await web3.eth.getAccounts();
        const contractAddress = contracts.betting_contract.address;
        const contractABI = contracts.betting_contract.abi;
    
        const contract = new web3.eth.Contract(contractABI, contractAddress);
        const withdraw_am = await contract.methods.balances(accounts[0]).call();
    
        setWitAm(withdraw_am);
    }
    const [text, setText] = useState("");


    const [address, setAddress] = useState("");
    const [score, setScore] = useState("");
    const [status, setStatus] = useState("");


    const [address_get, setAddress_get] = useState("");
    const [reputation, setReputation] = useState("");
    const [status_get, setStatus_get] = useState("");

    const [pool, setPool] = useState("");
    const [pool_id, setPoolID] = useState("");
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const [pool_id_settle, setPoolIDSettle] = useState("");
    const [with_amount, setWitAm] = useState("");

    const [reqID, setReqID] = useState("");
    const [reqInd, setReqInd] = useState("");

    const [thread_id, setThreadID] = useState("");
    const [thread_id_get, setThreadIDGet] = useState("");
    const [message, setMessage] = useState("");

    const [thread, setThread] = useState("");

    const handleSubmitGetPool = async (event) => {
        event.preventDefault();
    
        const contractAddress = contracts.betting_contract.address;
        const contractABI = contracts.betting_contract.abi;
    
        const contract = new web3.eth.Contract(contractABI, contractAddress);
        const pool = await contract.methods.bettingPools(pool_id).call();
    
        setPool(pool);
        setIsVisible(true);
      };
  
    const handleSubmitPlaceBet = async (event) => {
      event.preventDefault();
      const contractAddress = contracts.betting_contract.address;
      const contractABI = contracts.betting_contract.abi;
  
      const contract = new web3.eth.Contract(contractABI, contractAddress);
      const accounts = await web3.eth.getAccounts();
  
      setStatus("Submitting transaction...");
  
      try {
        await contract.methods.placeBet(pool_id, score).send({ from: accounts[0], value: amount });
        setStatus("Transaction successful!");
      } catch (error) {
        console.error(error);
        setStatus("Transaction failed.");
      }
    };

    const handleSubmitSettleBetPool = async (event) => {
        event.preventDefault();
        const contractAddress = contracts.betting_contract.address;
        const contractABI = contracts.betting_contract.abi;
    
        const contract = new web3.eth.Contract(contractABI, contractAddress);
        const accounts = await web3.eth.getAccounts();
    
        setStatus("Submitting transaction...");
    
        try {
          await contract.methods.settleBettingPool(pool_id,reqID,reqInd).send({ from: accounts[0] });
          setStatus("Transaction successful!");
        } catch (error) {
          console.error(error);
          setStatus("Transaction failed.");
        }
      };

      const handleSubmitCreateThread = async (event) => {
        event.preventDefault();
        const contractAddress = contracts.forum_contract.address;
        const contractABI = contracts.forum_contract.abi;
    
        const contract = new web3.eth.Contract(contractABI, contractAddress);
        const accounts = await web3.eth.getAccounts();
    
        setStatus("Submitting transaction...");
    
        try {
          await contract.methods.createThread(title, pool_id).send({ from: accounts[0] });
          setStatus("Transaction successful!");
        } catch (error) {
          console.error(error);
          setStatus("Transaction failed.");
        }
      };

      const handleSubmitPostMessage = async (event) => {
        event.preventDefault();
        const contractAddress = contracts.forum_contract.address;
        const contractABI = contracts.forum_contract.abi;
    
        const contract = new web3.eth.Contract(contractABI, contractAddress);
        const accounts = await web3.eth.getAccounts();
    
        setStatus("Submitting transaction...");
    
        try {
          await contract.methods.postMessage(thread_id, message).send({ from: accounts[0] });
          setStatus("Transaction successful!");
        } catch (error) {
          console.error(error);
          setStatus("Transaction failed.");
        }
      };

      const handleSubmitGetThread = async (event) => {
        event.preventDefault();
        const contractAddress = contracts.forum_contract.address;
        const contractABI = contracts.forum_contract.abi;
    
        const contract = new web3.eth.Contract(contractABI, contractAddress);
    
        const thread = await contract.methods.getThread(thread_id_get).call();
        setThread(thread);
      };

    return (
      <div className="a">
        <h1>Create Thread</h1>
        <form onSubmit={handleSubmitCreateThread}>
            <label>
                Thread title:
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </label>
            <label>
                Pool ID:
                <input type="number" value={pool_id} onChange={(e) => setPoolID(e.target.value)} />
            </label>
            <button type="submit">Submit</button>
            <p>{status}</p>
        </form>

        <h1>Post message</h1>
        <form onSubmit={handleSubmitPostMessage}>
            <label>
                Thread ID:
                <input type="number" value={thread_id} onChange={(e) => setThreadID(e.target.value)} />
            </label>
            <label>
                Message:
                <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
            </label>
            <button type="submit">Submit</button>
            <p>{status}</p>
        </form>

        <h1>Get Thread</h1>
        <form onSubmit={handleSubmitGetThread}>
            <label>
                Thread ID:
                <input type="number" value={thread_id_get} onChange={(e) => setThreadIDGet(e.target.value)} />
            </label>
            <button type="submit">Submit</button>
            <p>{thread}</p>
        </form>
      </div>
      
    );
  }
  
  