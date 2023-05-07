const reputation_contract = {
    abi: [{ "inputs": [ { "internalType": "address", "name": "user", "type": "address" }, { "internalType": "uint256", "name": "score", "type": "uint256" } ], "name": "addReputation", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "user", "type": "address" } ], "name": "getReputation", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "", "type": "address" } ], "name": "reputationScores", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }],
    address: "0x992932a326D3F5F855fEB81e30d9c344Db8B72B0"
  };

const consumer_contract = {
  abi: [{ "inputs": [ { "internalType": "address", "name": "_link", "type": "address" }, { "internalType": "address", "name": "_oracle", "type": "address" } ], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [ { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "FailedTransferLINK", "type": "error" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "bytes32", "name": "id", "type": "bytes32" } ], "name": "ChainlinkCancelled", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "bytes32", "name": "id", "type": "bytes32" } ], "name": "ChainlinkFulfilled", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "bytes32", "name": "id", "type": "bytes32" } ], "name": "ChainlinkRequested", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "bytes32", "name": "reqId", "type": "bytes32" }, { "indexed": false, "internalType": "uint256", "name": "l", "type": "uint256" } ], "name": "gameCreated", "type": "event" }, { "inputs": [], "name": "_getOracleAddress", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "bytes32", "name": "_requestId", "type": "bytes32" }, { "internalType": "uint256", "name": "_payment", "type": "uint256" }, { "internalType": "bytes4", "name": "_callbackFunctionId", "type": "bytes4" }, { "internalType": "uint256", "name": "_expiration", "type": "uint256" } ], "name": "cancelRequest", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "bytes32", "name": "_requestId", "type": "bytes32" }, { "internalType": "bytes[]", "name": "_result", "type": "bytes[]" } ], "name": "fulfillSchedule", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "bytes32", "name": "_requestId", "type": "bytes32" }, { "internalType": "uint256", "name": "_idx", "type": "uint256" } ], "name": "getGameCreate", "outputs": [ { "components": [ { "internalType": "uint32", "name": "gameId", "type": "uint32" }, { "internalType": "uint40", "name": "startTime", "type": "uint40" }, { "internalType": "string", "name": "homeTeam", "type": "string" }, { "internalType": "string", "name": "awayTeam", "type": "string" } ], "internalType": "struct EnetscoresConsumer.GameCreate", "name": "", "type": "tuple" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "bytes32", "name": "_requestId", "type": "bytes32" }, { "internalType": "uint256", "name": "_idx", "type": "uint256" } ], "name": "getGameResolve", "outputs": [ { "components": [ { "internalType": "uint32", "name": "gameId", "type": "uint32" }, { "internalType": "uint8", "name": "homeScore", "type": "uint8" }, { "internalType": "uint8", "name": "awayScore", "type": "uint8" }, { "internalType": "string", "name": "status", "type": "string" } ], "internalType": "struct EnetscoresConsumer.GameResolve", "name": "", "type": "tuple" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "bytes32", "name": "_requestId", "type": "bytes32" }, { "internalType": "uint256", "name": "_idx", "type": "uint256" } ], "name": "getGameResult", "outputs": [ { "internalType": "uint8", "name": "homeScore", "type": "uint8" }, { "internalType": "uint8", "name": "awayScore", "type": "uint8" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "bytes32", "name": "", "type": "bytes32" }, { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "requestIdGames", "outputs": [ { "internalType": "bytes", "name": "", "type": "bytes" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "bytes32", "name": "_specId", "type": "bytes32" }, { "internalType": "uint256", "name": "_payment", "type": "uint256" }, { "internalType": "uint256", "name": "_market", "type": "uint256" }, { "internalType": "uint256", "name": "_leagueId", "type": "uint256" }, { "internalType": "uint256", "name": "_date", "type": "uint256" } ], "name": "requestSchedule", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "bytes32", "name": "_specId", "type": "bytes32" }, { "internalType": "uint256", "name": "_payment", "type": "uint256" }, { "internalType": "uint256", "name": "_market", "type": "uint256" }, { "internalType": "uint256", "name": "_leagueId", "type": "uint256" }, { "internalType": "uint256", "name": "_date", "type": "uint256" }, { "internalType": "uint256[]", "name": "_gameIds", "type": "uint256[]" } ], "name": "requestSchedule", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "_oracle", "type": "address" } ], "name": "setOracle", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "bytes32", "name": "_requestId", "type": "bytes32" }, { "internalType": "bytes[]", "name": "_games", "type": "bytes[]" } ], "name": "setRequestIdGames", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address payable", "name": "_payee", "type": "address" }, { "internalType": "uint256", "name": "_amount", "type": "uint256" } ], "name": "withdrawLink", "outputs": [], "stateMutability": "nonpayable", "type": "function" }],
  address: "0x985aE4705d3de1daC98606fa27504BeFE66F182d"
};

const did_contract = {
  abi: [{ "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": false, "internalType": "string", "name": "data", "type": "string" } ], "name": "PrivateSettingsUpdated", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": false, "internalType": "string", "name": "visible", "type": "string" } ], "name": "VisibleSettingsUpdated", "type": "event" }, { "inputs": [ { "internalType": "address", "name": "_user", "type": "address" } ], "name": "getSettings", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "_user", "type": "address" } ], "name": "getVisibleSettings", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "string", "name": "_data", "type": "string" } ], "name": "updatePrivateSettings", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "string", "name": "_visible", "type": "string" } ], "name": "updateVisibleSettings", "outputs": [], "stateMutability": "nonpayable", "type": "function" }],
  address: "0xa17b17ea742A4a0E2a4815139312822320484714"
};
  
  module.exports = {
    reputation_contract,
    consumer_contract,
    did_contract
  };