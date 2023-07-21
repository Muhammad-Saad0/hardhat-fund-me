const {
    ethers,
    deployments,
    getNamedAccounts,
  } = require("hardhat");
  const { expect } = require("chai");
  
  describe("fundMe", async () => {
    let deployer, fundMe, MockV3Aggregator;
    beforeEach(async () => {
      deployer = (await getNamedAccounts())
        .deployer;
      /*this will run the whole deploy folder with the files having specific tags*/
      await deployments.fixture(["all"]);
      console.log(deployer);
  
      /*the second parameter is deployer means
        we connected the contract with deployer
        account now all the trasactions will be made
        by deployer*/
      console.log("helloo");
      fundMe = await ethers.getContract(
        "FundMe",
        deployer
      );
      MockV3Aggregator = await ethers.getContract(
        "MockV3Aggregator"
      );
    });
    describe("constructor", async () => {
      it("sets the V3Aggregator correctly", async () => {
          V3AggregatorAddress = await fundMe.priceFeed();
        expect(V3AggregatorAddress).to.equal(
          MockV3Aggregator.address
        );
      });
    });
  });
  