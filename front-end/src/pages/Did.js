import React, {useState} from 'react';
import web3 from '../web3';
const contracts = require("../contracts.js");

// Use web3 to interact with the Ethereum network
export function DID() {
  const [privateSettings, setPrivate] = useState("");
  const [visibleSettings, setVisible] = useState("");

  const [addressgetPriv, setAddressPriv] = useState("");
  const [addressgetVis, setAddressVis] = useState("");




  const [privateSettingsGet, setPrivate_get] = useState("");
  const [visibleSettingsGet, setVisible_get] = useState("");

  const getVisible = async (event) => {
    event.preventDefault();

    const contractAddress = contracts.did_contract.address;
    const contractABI = contracts.did_contract.abi;
    
    const contract = new web3.eth.Contract(contractABI, contractAddress);
    const visible = await contract.methods.getVisibleSettings(addressgetVis).call();
    
    let json = visible.replaceAll("'", "\"");
    setVisible_get(JSON.parse(json));
    
  }
  const getPrivate = async (event) => {
    event.preventDefault();

    const contractAddress = contracts.did_contract.address;
    const contractABI = contracts.did_contract.abi;
    const accounts = await web3.eth.getAccounts();
    
    const contract = new web3.eth.Contract(contractABI, contractAddress);
    const visible = await contract.methods.getSettings(addressgetPriv).call({from: accounts[0]});
    let json = visible.replaceAll("'", "\"");
    setPrivate_get(JSON.parse(json));
    
  }
  const setPrivateSettings = async (event) => {
    event.preventDefault();
    const contractAddress = contracts.did_contract.address;
    const contractABI = contracts.did_contract.abi;
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
    const contractAddress = contracts.did_contract.address;
    const contractABI = contracts.did_contract.abi;
    const accounts = await web3.eth.getAccounts();

    const contract = new web3.eth.Contract(contractABI, contractAddress);
    try {
      await contract.methods.updateVisibleSettings(visibleSettings).send({from: accounts[0]});
      
    }catch(error){
      console.error(error);
      
    }
  }

  return (
      <div className='a'>
        <h1>My dApp</h1>
       <form onSubmit={setVisibleSettings}>
            <label>
                Visible setting update (example: &#123; 'test': 'test'&#125;):
                <input type="text" value={visibleSettings} onChange={(e) => setVisible(e.target.value)} />
            </label>
            <button type="submit">Update</button>
        </form>
        <form onSubmit={setPrivateSettings}>
           <label>
                Private setting update (example: &#123; 'test': 'test'&#125;):
                <input type="text" value={privateSettings} onChange={(e) => setPrivate(e.target.value)}/>
            </label>
            <button type="submit">Update</button>

        </form>
        <form onSubmit={getVisible}>
        <h1>Public  user Profile</h1>
        <input type="text" value={addressgetVis} onChange={(e) => setAddressVis(e.target.value)} />
          <button type="submit">Check Visible </button>
          <div>
            
            <ul>
            {Object.entries(visibleSettingsGet).map(([key, value]) => (
              <li key={key}>
                <strong>{key}: </strong>{value}
              </li>
            ))}
          </ul>
          </div>
        </form>

        <form onSubmit={getPrivate}>
        <h1>Private user Profile</h1>
        <input type="text" value={addressgetPriv} onChange={(e) => setAddressPriv(e.target.value)} />
        
          <button type="submit">Check Private</button>
          <div>
            
            <ul>
            {Object.entries(privateSettingsGet).map(([key, value]) => (
              <li key={key}>
                <strong>{key}: </strong>{value}
              </li>
            ))}
          </ul>
          </div>
        </form>
      </div>
    );
  }
  
  