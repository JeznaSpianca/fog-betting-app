// SPDX-License-Identifier: MIT
// Reputation smart contract

pragma solidity 0.8.15;

contract Reputation {
    
    mapping(address => uint) public reputationScores;
    
    function addReputation(address user, uint score) public {
        reputationScores[user] += score;
    }
    
    function getReputation(address user) public view returns (uint) {
        return reputationScores[user];
    }
}