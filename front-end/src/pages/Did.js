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

  return (
      <div>
        <h1>My dApp</h1>
       <form>
            <label>
                Visible setting update:
                <input type="text" value={visibleSettings} onChange={(e) => setVisible(e.target.value)} />
            </label>
            <button type="submit">Update</button>
        </form>
        <form>
           <label>
                Private setting update:
                <input type="text" value={privateSettings} onChange={(e) => setPrivate(e.target.value)}/>
            </label>
            <button type="submit">Update</button>
        </form>
        <form onSubmit={getVisible}>
          <button type="submit">Check Visible </button>
        </form>
        <input type="text" value={"address"} onChange={(e) => setVisible_get(e.target.value)} />
        <form>
          <button type="submit">Check Private</button>
        </form>
      </div>
    );
  }
  
  