
# Peer-to-Peer Betting DApp
This decentralized application (DApp) allows users to create and join peer-to-peer betting pools for various sports events. The DApp uses smart contracts and digital identifiers (DIDs) to facilitate secure and transparent betting transactions. Current version of this repository is set up for smart contracts, which will be developed first.

## Features
- User authentication through digital identifiers (DIDs).
- Create and join peer-to-peer betting pools for various sports events.
- Automated event result determination using smart oracles.
- Secure and transparent betting transactions through smart contracts.
- Reputation system for users to rate and review each other's betting behavior.
- Chatrooms for each betting pool for users to communicate with each other.

## Smart Contract Naming Convention
In order to maintain consistency and clarity in our code, we will use the following naming convention for our smart contracts:

- Contracts should be named using PascalCase.
- Functions should be named using camelCase.
- Variables should be named using camelCase.
- Constants should be named using uppercase snake_case.

## Data Formats
The following data formats will be used for data exchange among services:

- JSON: for data exchange between frontend and backend.
- ABI: for communication between the frontend and the smart contract.
- Event logs: for tracking transactions and events within the smart contract.


## Functionalities
The Functionalities which will be implemented first are smart contracts.

### Betting Pools
- Create a new betting pool with a specified sport and event.
- Join an existing betting pool.
- Place a bet on an outcome in the pool.
- Receive a payout automatically based on the results of the event.

### User Reputation
- Maintain a reputation score based on the accuracy of bets placed.
- Display the reputation score to other users in the network.
- Use the reputation score to determine eligibility for certain betting pools.

### DID Management
Create and manage a decentralized digital identity (DID).
Share and revoke access to personal information stored in the DID.
Update the DID with additional information as needed.

## Getting started
1. Clone the repo.
2. Install dependencies with `npm install`.

