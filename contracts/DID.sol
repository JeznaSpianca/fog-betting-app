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

    event SettingsUpdated(address indexed user, string data, string visible);

    function updateSettings(string memory _data, string memory _visible) public {
        userSettings[msg.sender].data = _data;
        userSettings[msg.sender].visible = _visible;
        emit SettingsUpdated(msg.sender, _data, _visible);
    }

    function getSettings(address _user) public view returns (string memory) {
        require(_user == msg.sender, "Access denied");
        return userSettings[_user].data;
    }

    function getVisibleSettings(address _user) public view returns (string memory) {
        require(_user == msg.sender, "Access denied");
        return userSettings[_user].visible;
    }
}
