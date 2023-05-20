import React, { useState } from "react";
import web3 from '../web3';
const contracts = require("../contracts.js");

// Use web3 to interact with the Ethereum network
export function CreatePools() {
    const [status, setStatus] = useState("");
    const [poolName, setPoolName] = useState("");
    const [gameID, setGameID] = useState("");
    const [consumerAdd, setConsumerAdd] = useState("");
    const [ownerFee, setOwnerFee] = useState("");

    const [reqID, setReqID] = useState("");
    const [reqInd, setReqInd] = useState("");

    const [reqIDRes, setReqIDRes] = useState("");
    const [reqIndRes, setReqIndRes] = useState("");
    const [reqResolved, setReqResolved] = useState("");

    const [market, setMarket] = useState("");
    const [leagueID, setLeagueID] = useState("");
    const [timestamp, setTimeStamp] = useState("");

      const handleSubmitCreatePool = async (event) => {
        event.preventDefault();
        const contractAddress = contracts.betting_contract.address;
        const contractABI = contracts.betting_contract.abi;
    
        const contract = new web3.eth.Contract(contractABI, contractAddress);
        const accounts = await web3.eth.getAccounts();
    
        setStatus("Submitting transaction...");
        try {
          await contract.methods.createBettingPool(poolName, reqID, reqInd, gameID, consumerAdd, ownerFee).send({ from: accounts[0] });
          setStatus("Transaction successful!");
        } catch (error) {
          console.error(error);
          setStatus("Transaction failed.");
        }
      };

      const handleSubmitRequestSchedule = async (event) => {
        event.preventDefault();
        const contractAddress = contracts.consumer_contract.address;
        const contractABI = contracts.consumer_contract.abi;
        const specID = "0x6431313062356334623833643432646361323065343130616335333763643934";
        const linkAmount = 100000000000000000;
    
        const contract = new web3.eth.Contract(contractABI, contractAddress);
        const accounts = await web3.eth.getAccounts();
    
        setStatus("Submitting transaction...");
        try {
          await contract.methods.requestSchedule(specID, linkAmount,market, leagueID, timestamp ).send({ from: accounts[0] });
          setStatus("Transaction successful!");
        } catch (error) {
          console.error(error);
          setStatus("Transaction failed.");
        }
      };

      const handleGetRequestGameResolve = async (event) => {
        event.preventDefault();
        const contractAddress = contracts.consumer_contract.address;
        const contractABI = contracts.consumer_contract.abi;
    
        const contract = new web3.eth.Contract(contractABI, contractAddress);
        const game = await contract.methods.getGameResolve(reqIDRes, reqIndRes).call();
        console.log(game);
        setReqResolved(game);
      }

    return (
      <div>
        <h1>Create betting pool</h1>
        <div>
          <p>Enetscores data oracle seems to be malfunctioning due to the enetscore api not working correctly. This means that when
            the consumer contract makes an oracle request, the response may come in a few hours or not even that.
            That is why we are going to be using the consumer contract that has already made requests and gotten responses in the past. Because of that we are limited to
            one game for which we have gotten a result from the oracle.
          </p>
          <p>That is why until the API is fixed or the app changes the oracle to use, the usage of the app is limited regarding creating the betting pools.</p>
          <h3>Example data for creating betting pools</h3>
          <p>The first example for a game which can be used to create betting pools:</p>
          <ul>
            <li>Req id: 0xc5f1c30b7889162a2c72fb6028f16eb9344c18a83dd2a14004a713eb89408103</li>
            <li>Req index: 0</li>
            <li>Game id; 3901212</li>
            <li>Consumer contract:0x3A1Ac99373Fd846De2d092F839BA0FD1096286c1 </li>
            <li>The score of this game was 4:1 for the home team so when the betting pool will be resolved, the bets that bet towards the home team will win.</li>
          </ul>
          <p>The second example for a game:</p>
          <ul>
            <li>Req id: 0x310cdfd8dacd552f910a839f9f8b0722b22ebc8a4c37b4eb990f13b73de2843f</li>
            <li>Req index: 0</li>
            <li>Game id; 3901272</li>
            <li>Consumer contract:0x3A1Ac99373Fd846De2d092F839BA0FD1096286c1 </li>
            <li>The score of this game was 1:3 for the away team so when the betting pool will be resolved, the bets that bet towards the away team will win.</li>
          </ul>
        </div>
        <form onSubmit={handleSubmitCreatePool}>
          <div>
            <label>
                Pool Name:
                <input type="text" value={poolName} onChange={(e) => setPoolName(e.target.value)} />
            </label>
            </div>
            <div>
            <label>
                Request ID on consumer contract (given the current situation paste this: 0xc5f1c30b7889162a2c72fb6028f16eb9344c18a83dd2a14004a713eb89408103):
                <input type="text" value={reqID} onChange={(e) => setReqID(e.target.value)} />
            </label>
            </div>
            <div>
            <label>
                Request index (should be 0):
                <input type="number" value={reqInd} onChange={(e) => setReqInd(e.target.value)} />
            </label>
            </div>
            <div>
            <label>
                Game ID (should be 3901212):
                <input type="number" value={gameID} onChange={(e) => setGameID(e.target.value)} />
            </label>
            </div>
            <div>
            <label>
                Consumer contract address (should be 0x3A1Ac99373Fd846De2d092F839BA0FD1096286c1):
                <input type="text" value={consumerAdd} onChange={(e) => setConsumerAdd(e.target.value)} />
            </label>
            </div>
            <div>
            <label>
                Owner fee (0-100, this fee is cut from the total loss amount from losing bets):
                <input type="number" min="0" max="100" value={ownerFee} onChange={(e) => setOwnerFee(e.target.value)} />
            </label>
            </div>
            <button type="submit">Submit</button>
            <p>{status}</p>
        </form>


        <h1>Get resolved games</h1>
        <div>
          <p>Here you can get game results for games, for which you have requested to be scheduled for resolve (market=1). This will query the Consumer contract 
            and return the game ID and score. (note that if you want the team names, you have to request schedule with the game ID, timestamp and market=0).
          </p>
          <p>Given that the Enetscore API is having problems, we have 2 examples you can test here and don't have to Request scheduled games below.</p>
          <p>The first example for a game:</p>
          <ul>
            <li>Req id: 0xc5f1c30b7889162a2c72fb6028f16eb9344c18a83dd2a14004a713eb89408103</li>
            <li>Req index: 0</li>
          </ul>
          <p>The second example for a game:</p>
          <ul>
            <li>Req id: 0x310cdfd8dacd552f910a839f9f8b0722b22ebc8a4c37b4eb990f13b73de2843f</li>
            <li>Req index: 0</li>
          </ul>
        </div>
        <form onSubmit={handleGetRequestGameResolve}>
            <label>
                Request ID:
                <input type="text" value={reqIDRes} onChange={(e) => setReqIDRes(e.target.value)} />
            </label>
            <label>
                Request Index:
                <input type="number" value={reqIndRes} onChange={(e) => setReqIndRes(e.target.value)} />
            </label>
            <button type="submit">Submit</button>
            <p>Resolved game:</p>
            <ul>
              <li>Game ID: {reqResolved.gameId}</li>
              <li>Score (home:away): {reqResolved.homeScore}:{reqResolved.awayScore}</li>
          </ul>
        </form>


        <h1>Request scheduled games</h1>
        <div>
          <p>This form allows you to resuest scheduled games to the Enetscore Smart Oracle. At the moment the Enetescore API is not working correctly so
            the response will probably not come or will come in a few hours. Look at the Readme where it is explained how the smart oracle works.
          </p>
          <p>This should be used when the oracle works and with the other Consumer contract that is in prototype_contrats directory.</p>
        </div>
        <form onSubmit={handleSubmitRequestSchedule}>
            <label>
                Market(see Readme):
                <input type="number" value={market} onChange={(e) => setMarket(e.target.value)} />
            </label>
            <label>
                League ID (see Readme):
                <input type="number" value={leagueID} onChange={(e) => setLeagueID(e.target.value)} />
            </label>
            <label>
                Timestamp:
                <input type="number" value={timestamp} onChange={(e) => setTimeStamp(e.target.value)} />
            </label>
            <button type="submit">Submit</button>
            <p>{status}</p>
        </form>
      </div>
      
    );
  }
  
  