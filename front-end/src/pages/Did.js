import React from 'react';
import web3 from '../web3';

// Use web3 to interact with the Ethereum network
export function DID() {

    return (
      <div>
        <h1>My dApp</h1>
        <p>Hi there</p>
       <form>
            <label>
                Visible setting update:
                <input type="text" value={"address"} ></input>
            </label>
            <button type="submit">Update</button>
            </form>
            <form>
            <label>
                Private setting update:
                <input type="text" value={"score"}></input>
            </label>
            <button type="submit">Update</button>
        </form> 
      </div>
    );
  }
  
  