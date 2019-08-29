// import Web3 from 'web3';
// import SolnSquareVerifierArtifact from "../build/contracts/SolnSquareVerifier.json";
var SolnSquareVerifierArtifact = require("../build/contracts/SolnSquareVerifier.json");
const Web3 = require("Web3");
var proofs = require('../proofs.js');

const App = {
    web3: null,
    account: null,
    meta: null,
  
    start: async function() {
      const { web3 } = this;
  
      try {
        // get contract instance
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = SolnSquareVerifierArtifact.networks[networkId];
        this.meta = new web3.eth.Contract(
        SolnSquareVerifier.abi,
          deployedNetwork.address,
        );

        // get accounts
      const accounts = await web3.eth.getAccounts();
      this.account = accounts[0];
    } catch (error) {
        console.error("Could not connect to contract or chain.");
      }
    },
    mint: async function() {
        const { mint } = this.meta.methods;
        for(var i=0; i<10; i++){
            let proof = proofs[i];
        await mint(this.account, i+1, proof.proof.a, proof.proof.b, proof.proof.c, proof.inputs).send({from: this.account});
        console.log("I am here ..")
        }
      },

    };

    

window.App = App;

window.addEventListener("load", async function() {
  if (window.ethereum) {
    // use MetaMask's provider
    App.web3 = new Web3(window.ethereum);
    await window.ethereum.enable(); // get permission to access accounts
  } else {
    console.warn("No web3 detected. Falling back to http://127.0.0.1:9545. You should remove this fallback when you deploy live",);
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    App.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:9545"),);
  }

  App.start();
  App.mint();
});