import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import web3 from '../web3';
const contracts = require("../contracts.js");


const boxStyle = {
    border: '1px solid #000',
    borderRadius: '4px',
    padding: '10px',
    background: '#f0f0f0',
  };
export function Thread() {
    const { threadId } = useParams();
    const [thread, setThread] = useState(null);
    const [threadInfo, setThreadInfo] = useState(null);
    const [message, setMessage] = useState("");
  
    useEffect(() => {
        const fetchThread = async () => {
            const accounts = await web3.eth.getAccounts();
            const contractAddress = contracts.forum_contract.address;
            const contractABI = contracts.forum_contract.abi;
        
            const contract = new web3.eth.Contract(contractABI, contractAddress);
            const threadInfo = await contract.methods.threads(threadId).call();
            console.log(threadInfo);
            const thread = await contract.methods.getThread(threadId).call();
            setThread(thread);
            setThreadInfo(threadInfo);
        }
        fetchThread();
    }, [threadId]);

    function date(dt) {
      dt = parseInt(dt)*1000;
      const date = new Date(dt);

      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();

      const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      return formattedDate;
    }


    const handleSubmitMessage = async (event) => {
        event.preventDefault();
        const accounts = await web3.eth.getAccounts();
        const contractAddress = contracts.forum_contract.address;
        const contractABI = contracts.forum_contract.abi;
    
        const contract = new web3.eth.Contract(contractABI, contractAddress);
        await contract.methods.postMessage(threadId, message).send({ from: accounts[0] });
        window.location.reload();
      };
  
    if (!thread) {
      return <div>Loading thread...</div>;
    }
  
    return (
      <div className='a'>
        <h1>Thread title: {threadInfo.title}</h1>
        <p>Thread for pool: {threadInfo.poolId}</p>
        {thread.map((thr) => (
            <div style={boxStyle} key={thr[0]}>
                <p>Message:  {thr[1]}</p>
                <p>Author:  {thr[2]}</p>
                <p>Date:  {date(thr[3])}</p>
            </div>
          ))}
        <div>
        <form onSubmit={handleSubmitMessage}>
            <label>
                Type message:
                <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
            </label>
            <button type="submit">Submit</button>
        </form>
        </div>
      </div>
    );
  }
  