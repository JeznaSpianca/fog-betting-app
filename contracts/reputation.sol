// SPDX-License-Identifier: MIT
// Reputation smart contract

pragma solidity 0.8.15;

contract Reputation {
    
    mapping(address => uint) public reputationScores;
    address[] public users;
    
    function addReputation(address user, uint score) public {
        reputationScores[user] += score;
        bool exists = false;
        for (uint i=0; i<users.length; i++) {
            if (users[i] == user) {
                exists = true;
                break;
            }
        }
        if (!exists) {
            //Log error or uncomment bellow to add user
            //users.push(user);
        }
    }
    
    function getReputation(address user) public view returns (uint) {
        return reputationScores[user];
    }
    
    function getAllUsers() public view returns (address[] memory) {
        return users;
    }
    
    function addUser(address user) public {
        bool exists = false;
        for (uint i=0; i<users.length; i++) {
            if (users[i] == user) {
                exists = true;
                break;
            }
        }
        if (!exists) {
            users.push(user);
        }
    }
}