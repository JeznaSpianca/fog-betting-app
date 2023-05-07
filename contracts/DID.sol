// SPDX-License-Identifier: MIT
// Reputation smart contract
pragma solidity 0.8.15;

//At the moment te settings are intended to be a json string
contract DIDContract {
    struct Settings {
        string data; //Data will contain all settings of a user
        string visible; //Visible will contain only visible settings of a user
    }
    
    mapping(address => Settings) private userSettings;

    event PrivateSettingsUpdated(address indexed user, string data);
    event VisibleSettingsUpdated(address indexed user, string visible);

    function updatePrivateSettings(string memory _data) public {
        userSettings[msg.sender].data = _data;
        emit PrivateSettingsUpdated(msg.sender, _data);
    }

    function updateVisibleSettings(string memory _visible) public {
        userSettings[msg.sender].visible = _visible;
        emit VisibleSettingsUpdated(msg.sender, _visible);
    }

    function getSettings(address _user) public view returns (string memory) {
        require(_user == msg.sender, "Access denied");
        return userSettings[_user].data;
    }

    function getVisibleSettings(address _user) public view returns (string memory) {
        return userSettings[_user].visible;
    }
}
