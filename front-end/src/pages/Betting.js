import React, { useState, useEffect } from "react";
import web3 from '../web3';
const contracts = require("../contracts.js");

// Use web3 to interact with the Ethereum network
export function Betting() {
  
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
    const [amount, setAmount] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const [pool_id_settle, setPoolIDSettle] = useState("");
    const [with_amount, setWitAm] = useState("");

    const [reqID, setReqID] = useState("");
    const [reqInd, setReqInd] = useState("");

    const [reqIDUpdate, setReqIDUpdate] = useState("");
    const [reqIndUpdate, setReqIndUpdate] = useState("");
    const [pool_id_update, setPoolIDUpdate] = useState("");

    const [poolCount, setPoolCount] = useState("");


  const handleSubmitUpdateReqID = async (event) => {
      event.preventDefault();
      const contractAddress = contracts.betting_contract.address;
      const contractABI = contracts.betting_contract.abi;
  
      const contract = new web3.eth.Contract(contractABI, contractAddress);
      const accounts = await web3.eth.getAccounts();
  
      setStatus("Submitting transaction...");
  
      try {
        await contract.methods.updateReqID(reqIDUpdate,reqIndUpdate,pool_id_update).send({ from: accounts[0] });
        setStatus("Transaction successful!");
      } catch (error) {
        console.error(error);
        setStatus("Transaction failed.");
      }
    };

    const handleSubmitGetPool = async (event) => {
        event.preventDefault();
    
        const contractAddress = contracts.betting_contract.address;
        const contractABI = contracts.betting_contract.abi;
    
        const contract = new web3.eth.Contract(contractABI, contractAddress);
        const pool = await contract.methods.bettingPools(pool_id).call();
    
        setPool(pool);
        setIsVisible(true);
      };

      useEffect(() => {
        const getPoolCount = async () => {
          const contractAddress = contracts.betting_contract.address;
          const contractABI = contracts.betting_contract.abi;
      
          const contract = new web3.eth.Contract(contractABI, contractAddress);
          const poolC = await contract.methods.poolCount().call();
      
          setPoolCount(poolC);
        };
    
        getPoolCount();
      }, []);
  
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
          await contract.methods.settleBettingPool(pool_id_settle).send({ from: accounts[0] });
          setStatus("Transaction successful!");
        } catch (error) {
          console.error(error);
          setStatus("Transaction failed.");
        }
      };

      const handleWithdraw = async (event) => {
        event.preventDefault();
        const contractAddress = contracts.betting_contract.address;
        const contractABI = contracts.betting_contract.abi;
    
        const contract = new web3.eth.Contract(contractABI, contractAddress);
        const accounts = await web3.eth.getAccounts();
    
        setStatus("Submitting transaction...");
    
        try {
          await contract.methods.withdraw().send({ from: accounts[0] });
          setStatus("Transaction successful!");
        } catch (error) {
          console.error(error);
          setStatus("Transaction failed.");
        }
      };

    return (
      <div className="a">
        <div>
          There are currently {poolCount} betting pools (indexes from: 0 - {poolCount-1}).
        </div>
        <h1>Place bet</h1>

        <form onSubmit={handleSubmitPlaceBet}>
          <div>
            <label>
                Pool ID:
                <input type="number" value={pool_id} onChange={(e) => setPoolID(e.target.value)} />
            </label>
            <div>
            </div>
            <label>
                Outcome (0: hometeam win, 1: awayteam win, 2: draw):
                <input type="number" value={score} onChange={(e) => setScore(e.target.value)} />
            </label>
            </div>
            <div>
            <label>
                bet amount in wei:
                <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
            </label>
            </div>
            <button type="submit">Submit</button>
            <p>{status}</p>
        </form>

        <h1>Get pool</h1>
        <form onSubmit={handleSubmitGetPool}>
            <label>
                Pool ID:
                <input type="number" value={pool_id} onChange={(e) => setPoolID(e.target.value)} />
            </label>
            <button type="submit">Submit</button>
        </form>
            {isVisible && <div id="pool" visible="false">
            <p>Pool name: {pool.name}</p>
            <p>Total bets: {pool.totalBets}</p>
            <p>Total amount in pool: {pool.totalAmount}</p>
            <p>Pool outcome (4 if not settled): {pool.outcome}</p>
            <p>Pool req ID: {pool.requestID}</p>
            <p>Req index: {pool.req_index}</p>
            <p>Game ID: {pool.gameID}</p>
            <p>Owner: {pool.owner}</p>
            <p>Cons contract: {pool.cons_contract}</p>
            <p>Owner fee: {pool.ownerFee}%</p>
            </div>}

        <h1>Settle pool (only pool owner!)</h1>
        <form onSubmit={handleSubmitSettleBetPool}>
            <label>
                Pool ID:
                <input type="number" value={pool_id_settle} onChange={(e) => setPoolIDSettle(e.target.value)} />
                <button type="submit">Submit</button>
                <p>{status}</p>
            </label>
        </form>

        <h1>Withdraw</h1>
        <p>You can withdraw {with_amount} wei <button onClick={getWith}>Get Amount available to withdraw</button></p>

        <button onClick={handleWithdraw}>Withdraw</button>
        <p>{status}</p>

        <h1>Update request ID for betting pool</h1>
        <form onSubmit={handleSubmitUpdateReqID}>
            <label>
                Pool ID:
                <input type="number" value={pool_id_update} onChange={(e) => setPoolIDUpdate(e.target.value)} />
            </label>
            <label>
                Request ID:
                <input type="text" value={reqIDUpdate} onChange={(e) => setReqIDUpdate(e.target.value)} />
            </label>
            <label>
                Request Index
                <input type="number" value={reqIndUpdate} onChange={(e) => setReqIndUpdate(e.target.value)} />
            </label>
            <button type="submit">Submit</button>
            <p>{status}</p>
        </form>
      </div>
      
    );
  }
  
  