// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract chesapp {

    uint256 public balance;

    struct AllInformations{
        uint ranking;
        address nick;

    }


    mapping(address=>AllInformations) player;

    constructor(){
        player[msg.sender].ranking=1200;
        player[msg.sender].nick = msg.sender;
    }

    function PaybeforePlay () public payable {
    }

    function WithdrawMoneyToWinner( address payable WinnerAddress) public payable{
         address contractAddress= address(this);
         balance= address(this).balance;
         WinnerAddress.transfer(contractAddress.balance);
    }
}
