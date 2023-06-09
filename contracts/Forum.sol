// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

contract Forum {
    struct Thread {
        uint256 id;
        string title;
        address creator;
        mapping(uint256 => Message) messages;
        uint256 messageCount;
        uint256 poolId;
    }

    struct Message {
        uint256 id;
        string content;
        address author;
        uint256 timestamp;
    }

    uint256 public threadCount;
    mapping(uint256 => Thread) public threads;

    function createThread(string memory _title, uint256 _poolId) public {
        Thread storage thread = threads[threadCount];
        thread.id = threadCount;
        threadCount++;
        thread.title = _title;
        thread.creator = msg.sender;
        thread.messageCount = 0;
        thread.poolId = _poolId;
    }

    function postMessage(uint256 _threadId, string memory _content) public {
        require(_threadId <= threadCount, "Invalid thread id");
        Thread storage thread = threads[_threadId];
        thread.messageCount++;
        thread.messages[thread.messageCount] = Message(thread.messageCount, _content, msg.sender, block.timestamp);
    }

    function getThread(uint256 _threadId) public view returns (Message[] memory) {
        require(_threadId <= threadCount, "Invalid thread id");
        Thread storage thread = threads[_threadId];

        Message[] memory messages = new Message[](thread.messageCount);
        for (uint256 i = 1; i <= thread.messageCount; i++) {
            Message storage message = thread.messages[i];
            messages[i-1] = message;
        }
        return messages;
    }
}
