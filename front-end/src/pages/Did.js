import React, {useState} from 'react';
import web3 from '../web3';
const contracts = require("../contracts.js");

// Use web3 to interact with the Ethereum network
export function DID() {


  const [privateSettings, setPrivate] = useState("");
  const [publicSettings, setPublic] = useState("");
    return (
      <div>
        <h1>My dApp</h1>
       <form>
            <label>
                Visible setting update:
                <input type="text" value={publicSettings} onChange={(e) => setPublic(e.target.value)} />
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
      </div>
    );
  }
  
  