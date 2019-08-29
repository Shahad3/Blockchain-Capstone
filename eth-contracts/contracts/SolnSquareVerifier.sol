pragma solidity ^0.5.0;

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
import "./Verifier.sol";
import "./ERC721Mintable.sol";



// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class

contract SolnSquareVerifier is CustomERC721Token{
Verifier ver ;
constructor(string memory name, string memory symbol, address veriAddress) CustomERC721Token(name, symbol) public{
    ver = Verifier(veriAddress);
}


// TODO define a solutions struct that can hold an index & an address

struct Solution{
    uint256 index;
    address solAddress;
    bool exist;
}

// TODO define an array of the above struct
// Solution[] solArray;

// TODO define a mapping to store unique solutions submitted
// bytes32 key = keccak256(abi.encodePacked(index, airline, flight, timestamp))
mapping(bytes32=>Solution) solMap;


// TODO Create an event to emit when a solution is added
event solutionAdded(uint256 _index, address _solAddress);


// TODO Create a function to add the solutions to the array and emit the event
function addSolution(uint256 _index, address _solAddress) public returns (bool){
    bytes32 key = keccak256(abi.encodePacked(_index, _solAddress));
    solMap[key] = Solution(_index, _solAddress, true);
    emit solutionAdded(_index, _solAddress);
    return true;
}


// TODO Create a function to mint new NFT only after the solution has been verified
//  - make sure the solution is unique (has not been used before)
//  - make sure you handle metadata as well as tokenSuplly
function mint(address to, uint256 tokenId, uint[2] memory a, uint[2][2] memory b, uint[2] memory c,uint[2] memory input) public returns(bool){
    bytes32 key = keccak256(abi.encodePacked(tokenId, to));
    require(!solMap[key].exist, "This solution has been used before");
    bool result = ver.verifyTx(a,b,c,input);
    if(result){
    super.mint(to, tokenId,"");
    return true;
    }
    else{
        return false;
    }
}

}






















