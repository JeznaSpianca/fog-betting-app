// SPDX-License-Identifier: MIT

//First game create in Consumer, then create betting pool. When settling, call requestsSchedule with 1 and gameId call data to get game resolve struct and then settle bets.
pragma solidity 0.8.15;

//Outcomes will be 0: homeTeam won, 1: away team won, 2: draw

import "contracts/Consumer.sol";

contract Betting {
    struct Bet {
        uint256 id;
        address payable bettor;
        uint256 amount;
        uint256 outcome;
    }
    
    struct BettingPool {
        uint256 id;
        string name;
        uint256 totalBets;
        uint256 totalAmount;
        uint256 outcome;
        bool settled;
        bytes32 requestID;
        uint256 req_index;
        uint256 gameID;
        address owner;
        address cons_contract;
        uint256 ownerFee;
        mapping(uint256 => Bet) bets;
    }
    
    uint256 public poolCount;
    mapping(uint256 => BettingPool) public bettingPools;
    mapping(address => uint256) public balances;

    function createBettingPool(string memory _name, bytes32 _requestID, uint256 _req_index, uint256 _gameID, address _cons_contract, uint256 fee) public returns (uint256) {
        BettingPool storage pool = bettingPools[poolCount];
        pool.id = poolCount;
        pool.name = _name;
        pool.totalBets = 0;
        pool.totalAmount = 0;
        pool.outcome = 4;
        pool.settled = false;
        pool.requestID = _requestID;
        pool.req_index = _req_index;
        pool.gameID = _gameID;
        poolCount++;
        pool.owner = msg.sender;
        pool.cons_contract = _cons_contract;
        pool.ownerFee = fee;
        return poolCount;
    }

    function updateReqID(bytes32 _requestID, uint256 _req_index, uint256 _poolId) public {
        require(msg.sender == bettingPools[_poolId].owner, "You need to be an owner");
        BettingPool storage pool = bettingPools[_poolId];
        pool.requestID = _requestID;
        pool.req_index = _req_index;
    }

    function placeBet(uint256 _poolId, uint256 _outcome) public payable {
        require(!bettingPools[_poolId].settled, "Pool has already been settled");
        uint256 betId = bettingPools[_poolId].totalBets + 1;
        bettingPools[_poolId].bets[betId] = Bet(betId, payable(msg.sender), msg.value, _outcome);
        bettingPools[_poolId].totalBets++;
        bettingPools[_poolId].totalAmount += msg.value;
    }

    function settleBettingPool(uint256 _poolId) public {
        require(!bettingPools[_poolId].settled, "Pool has already been settled");
        require(msg.sender == bettingPools[_poolId].owner, "You need to be an owner");
        bettingPools[_poolId].settled = true;
        BettingPool storage pool = bettingPools[_poolId];
        bytes32 _requestID = pool.requestID;
        uint256 _req_index = pool.req_index;
        EnetscoresConsumer consumer = EnetscoresConsumer(bettingPools[_poolId].cons_contract);
        EnetscoresConsumer.GameResolve memory game = consumer.getGameResolve(_requestID, _req_index);
        uint256 homeScore = game.homeScore;
        uint256 awayScore = game.awayScore;
        
        uint256 outcome = 2;
        if (homeScore > awayScore) {
            outcome = 0;
        }
        if (homeScore < awayScore) {
            outcome = 1;
        }
        pool.outcome = outcome;
        uint256 totalLossAmount = 0;
        uint256 totalWinAmount = 0;
        uint256 totalBets = pool.totalBets;
        for (uint256 i = 1; i <= totalBets; i++) {
            Bet storage bet = pool.bets[i];
            if (bet.outcome != outcome) {
                totalLossAmount+= bet.amount;
            }
            else{
                totalWinAmount+=bet.amount;
            }
        }
        if(totalLossAmount>0) {
            uint256 owner_fee = totalLossAmount * pool.ownerFee / 100;
            pool.totalAmount -= owner_fee;
            totalLossAmount-=owner_fee;
            balances[pool.owner]+= owner_fee;
        }
        if(totalWinAmount>0){
            for (uint256 i = 1; i <= totalBets; i++) {
                Bet storage bet = pool.bets[i];
                if (bet.outcome == outcome) {
                    uint256 winnings = bet.amount + bet.amount * totalLossAmount / totalWinAmount;
                    balances[bet.bettor] += winnings;
                }
            }
        }
    }

    function withdraw() public {
        require(balances[msg.sender] > 0, "Insufficient balance");
        uint256 amount = balances[msg.sender];
        balances[msg.sender] = 0;
        payable(msg.sender).transfer(amount);
    }

    function getPoolName(uint256 _poolId) public view returns (string memory) {
    return bettingPools[_poolId].name;
    }

    function getPoolTotalBets(uint256 _poolId) public view returns (uint256) {
        return bettingPools[_poolId].totalBets;
    }

    function getPoolTotalAmount(uint256 _poolId) public view returns (uint256) {
        return bettingPools[_poolId].totalAmount;
    }

    function getPoolOutcome(uint256 _poolId) public view returns (uint256) {
        return bettingPools[_poolId].outcome;
    }

    function isPoolSettled(uint256 _poolId) public view returns (bool) {
        return bettingPools[_poolId].settled;
    }

    function getGameID(uint256 _poolId) public view returns (uint256) {
        return bettingPools[_poolId].gameID;
    }

    function getPoolCount() public view returns (uint256) {
        return poolCount;
    }

}