import React, {useState} from 'react';
import web3 from '../web3';
const contracts = require("../contracts.js");

// Use web3 to interact with the Ethereum network
export function DID() {
  const [privateSettings, setPrivate] = useState("");
  const [visibleSettings, setVisible] = useState("");

  const [address, setAddress] = useState("");
  const [address_get, setAddress_get] = useState("");
  const [privateSettingsGet, setPrivate_get] = useState("");
  const [visibleSettingsGet, setVisible_get] = useState("");

  const getVisible = async (event) => {
    event.preventDefault();

    const contractAddress = contracts.did_contract.address;
    const contractABI = contracts.did_contract.abi;
    
    const contract = new web3.eth.Contract(contractABI, contractAddress);
    const visible = await contract.methods.getVisibleSettings(address_get).call();
    
    setVisible_get(visible);
    
  }
  const getPrivate = async (event) => {
    event.preventDefault();

    const contractAddress = contracts.did_contract.address;
    const contractABI = contracts.did_contract.abi;
    
    const contract = new web3.eth.Contract(contractABI, contractAddress);
    const visible = await contract.methods.getSettings(address_get).call();
    
    setPrivate_get(visible);
    
  }
  const setPrivateSettings = async (event) => {
    event.preventDefault();
    const contractAddress = contracts.forum_contract.address;
    const contractABI = contracts.forum_contract.abi;
    const accounts = await web3.eth.getAccounts();

    const contract = new web3.eth.Contract(contractABI, contractAddress);
    try {
      await contract.methods.updatePrivateSettings(privateSettings).send({from: accounts[0]});
      
    }catch(error){
      console.error(error);
      
    }
  }
  const setVisibleSettings = async (event) => {
    event.preventDefault();
    const contractAddress = contracts.forum_contract.address;
    const contractABI = contracts.forum_contract.abi;
    const accounts = await web3.eth.getAccounts();

    const contract = new web3.eth.Contract(contractABI, contractAddress);
    try {
      await contract.methods.updateVisibleSettings(visibleSettings).send({from: accounts[0]});
      
    }catch(error){
      console.error(error);
      
    }
  }

  return (
      <div>
        <h1>My dApp</h1>
       <form onSubmit={setVisibleSettings}>
            <label>
                Visible setting update:
                <input type="text" value={visibleSettings} onChange={(e) => setVisible(e.target.value)} />
            </label>
            <button type="submit">Update</button>
        </form>
        <form onSubmit={setPrivateSettings}>
           <label>
                Private setting update:
                <input type="text" value={privateSettings} onChange={(e) => setPrivate(e.target.value)}/>
            </label>
            <button type="submit">Update</button>
        </form>
        <form onSubmit={getVisible}>
        <input type="text" value={"address"} onChange={(e) => setVisible_get(e.target.value)} />
          <button type="submit">Check Visible </button>
        </form>
        <form onSubmit={{getPrivate}}>
        <input type="text" value={"address"} onChange={(e) => setPrivate_get(e.target.value)} />
        
          <button type="submit">Check Private</button>
        </form>
      </div>
    );
  }
  
  