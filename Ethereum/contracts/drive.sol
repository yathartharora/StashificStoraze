// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Drive{
    
    struct File{
        string link;
        string name;
        string date;
        string format;
    }
    

    mapping(address => bool) public isRegistered;

    mapping(address => bytes4) public registered;
    mapping(address => File[]) public file;
    
    function upload(string memory file_name, string memory file_link, string memory d, string memory f) public{
        require(isRegistered[msg.sender]);
        file[msg.sender].push(File(file_name,file_link,d,f));
    }
    
    function registerTodrive(bytes4 pass) public{
        require(!isRegistered[msg.sender]);
        registered[msg.sender] = pass;
        isRegistered[msg.sender] = true;
    }
    
    function display(address sender, bytes4 pass) public view returns(File[] memory){
        require(registered[sender] == pass);
        return file[sender];
    }
}
