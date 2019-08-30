const HDWalletProvider = require("truffle-hdwallet-provider")
const web3 = require('web3');
const MNEMONIC = "";
const INFURA_KEY = ""

const CONTRACT_ADDRESS = "0x720550B2c8c34D586f5B4158816f74e858dfb3ef"
var SolnSquareVerifierArtifact = require("../build/contracts/SolnSquareVerifier.json");
// const NFT_CONTRACT_ADDRESS = process.env.NFT_CONTRACT_ADDRESS
const OWNER_ADDRESS = "0x5e2CD8Dd1F302C36CbA50b30827CBf5E49907162"
const NETWORK = "rinkeby";
var proofs = require('../proofs.js');


if (!MNEMONIC || !INFURA_KEY || !OWNER_ADDRESS || !NETWORK) {
    console.error("Please set a mnemonic, infura key, owner, network, and contract address.")
    return
}

// const NFT_ABI = 
const abi = SolnSquareVerifierArtifact.abi;

async function main() {
    const provider = new HDWalletProvider(MNEMONIC, `https://${NETWORK}.infura.io/v3/${INFURA_KEY}`)
    const web3Instance = new web3(
        provider
    )
try{
    if (CONTRACT_ADDRESS) {
        const nftContract = new web3Instance.eth.Contract(abi, CONTRACT_ADDRESS, { gasLimit: "1000000" })

        for(var i=0; i<10; i++){
          let proof = proofs[i];
      var result = await nftContract.methods.mint(OWNER_ADDRESS, i+1, proof.proof.a, proof.proof.b, proof.proof.c, proof.inputs).send({from: OWNER_ADDRESS});
      console.log("I am here ..")
      }

        // Creatures issued directly to the owner.
        // for (var i = 0; i < NUM_CREATURES; i++) {
        //     const result = await nftContract.methods.mintTo(OWNER_ADDRESS).send({ from: OWNER_ADDRESS });
        //     console.log("Minted creature. Transaction: " + result.transactionHash)
        // }
    } 
  }catch(e){console.log(e," |||| ", e.message);}
    
}

main()
