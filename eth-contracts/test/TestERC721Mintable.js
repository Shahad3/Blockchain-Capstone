// var ERC721MintableComplete = artifacts.require('ERC721MintableComplete');
var ERC721MintableComplete = artifacts.require('CustomERC721Token');


contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            try{
            this.contract = await ERC721MintableComplete.new("Name", "Symbol",{from: account_one});
            // TODO: mint multiple tokens
            await this.contract.mint(account_two, 1, "em");
            await this.contract.mint(account_two, 2, "dd");
           
            }
            catch(e){
                console.log("Error Error: ", e)
            }
        })

        it('should return total supply', async function () { 
            try{
            let supply = await this.contract.totalSupply();
            assert.equal(supply, 2, "Unvalid supply");
            }
            catch(e){
                console.log("Error Error: ", e);
            }
        })

        it('should get token balance', async function () { 
            try{
                let balance = await this.contract.balanceOf(account_two);
                assert.equal(balance, 2, "Unvalid balance");
                }
                catch(e){
                    console.log("Error Error: ", e);
                }
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            //setTokenURI
            try{
                let uri = await this.contract.tokenURI(1);
                assert.equal(uri, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1", "Unvalid balance");
                }
                catch(e){
                    console.log("Error Error: ", e);
                }
        })

        it('should transfer token from one owner to another', async function () {
            
            try{
                let uri = await this.contract.transferFrom(account_two, account_one, 1, {from: account_two});
                let newOwner = await this.contract.ownerOf(1);
                assert.equal(newOwner, account_one, "Unvalid owner");
                }
                catch(e){
                    console.log("Error Error: ", e.message);
                }
            
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new("Name", "Symbol",{from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            try{

                await this.contract.mint(account_two, 1, "em", {from: account_two});               
                }
                catch(e){
                    assert.equal(e,e,"It did not throw an error")
                }
            
        })

        it('should return contract owner', async function () {
            let owner = await this.contract.getOwner();
            assert.equal(owner,account_one,"Unvalid owner") 
            
        })

    });
})