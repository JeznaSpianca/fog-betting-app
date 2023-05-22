import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import web3 from '../web3';
const contracts = require("../contracts.js");

export function Forum () {

  async function getThreadCountFromContract() {
    const contractAddress = contracts.forum_contract.address;
    const contractABI = contracts.forum_contract.abi;

    const contract = new web3.eth.Contract(contractABI, contractAddress);
    const count = await contract.methods.threadCount().call();

    return count;
  }

  async function getThreadFromContract(ind) {
    const contractAddress = contracts.forum_contract.address;
    const contractABI = contracts.forum_contract.abi;

    const contract = new web3.eth.Contract(contractABI, contractAddress);
    const thread = await contract.methods.threads(ind).call();
    return thread;
  }

  const [threads, setThreads] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [threadsPerPage] = useState(5);
  const [isLoading, setIsLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [poolID, setPoolID] = useState("");

  const handleSubmitThread = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    const contractAddress = contracts.forum_contract.address;
    const contractABI = contracts.forum_contract.abi;

    const contract = new web3.eth.Contract(contractABI, contractAddress);
    await contract.methods.createThread(title, poolID).send({ from: accounts[0] });
    window.location.reload();
  };

  useEffect(() => {
    const fetchThreads = async () => {
      const threadCount = await getThreadCountFromContract(); // Replace with your logic to get the total thread count from the smart contract

      const fetchedThreads = [];
      const totalPages = Math.ceil(threadCount / threadsPerPage);
      const threadsToFetch = Math.min(threadCount, threadsPerPage);

      for (let i = 1; i <= totalPages; i++) {
        const startIndex = (i - 1) * threadsPerPage;
        const endIndex = i * threadsPerPage;

        const threadPromises = [];

        for (let j = startIndex; j <= endIndex && j < threadsToFetch; j++) {
          threadPromises.push(getThreadFromContract(j)); // Replace with your logic to fetch thread data from the smart contract based on the thread ID
        }
        const fetchedThreadData = await Promise.all(threadPromises);
        //const fetchedThreadData = threadPromises;
        fetchedThreads.push(...fetchedThreadData);
      }

      setThreads(fetchedThreads);
      setIsLoading(false);
    };

    fetchThreads();
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastThread = currentPage * threadsPerPage;
  const indexOfFirstThread = indexOfLastThread - threadsPerPage;
  const currentThreads = threads.slice(indexOfFirstThread, indexOfLastThread);
  console.log(currentThreads);

  return (
    <div className='a'>
      <h1>Thread List</h1>
      {isLoading ? (
        <p>Loading threads...</p>
      ) : threads.length === 0 ? (
        <p>No threads available.</p>
      ) : (
        <ul>
          {currentThreads.map((thread) => (
            <li key={thread.id}>
              <Link to={`/thread/${thread.id}`}>{thread.title}</Link>
            </li>
          ))}
        </ul>
      )}

      {threads.length > threadsPerPage && (
        <div>
          <ul className="pagination">
            {Array.from({ length: Math.ceil(threads.length / threadsPerPage) }).map((_, index) => (
              <li key={index}>
                <button onClick={() => handlePageChange(index + 1)}>{index + 1}</button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div>
        <h2>Create forum Thread</h2>
        <form onSubmit={handleSubmitThread}>
            <label>
                Title:
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </label>
            <label>
                Pool ID:
                <input type="number" value={poolID} onChange={(e) => setPoolID(e.target.value)} />
            </label>
            <button type="submit">Submit</button>
        </form>
        </div>
    </div>
  );
};
