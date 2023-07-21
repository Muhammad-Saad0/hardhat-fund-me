const {
  ethers,
  deployments,
  getNamedAccounts,
} = require("hardhat");
const { expect } = require("chai");

const sendValue = ethers.utils.parseEther("1"); //1eth
describe("fundMe", async () => {
  let deployer, fundMe, MockV3Aggregator;
  beforeEach(async () => {
    deployer = (await getNamedAccounts())
      .deployer;
    /*this will run the whole deploy folder with the files having specific tags*/
    await deployments.fixture(["all"]);

    /*the second parameter is deployer means
        we connected the contract with deployer
        account now all the trasactions will be made
        by deployer*/
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
      V3AggregatorAddress =
        await fundMe.priceFeed();
      expect(V3AggregatorAddress).to.equal(
        MockV3Aggregator.address
      );
    });
  });

  describe("fund", async () => {
    it("fails if not enough eth sent", async () => {
      const tx = fundMe.fund({ value: 0 });
      await expect(tx).to.be.reverted;
    });

    it("checks the amount funded gets updated", async () => {
      await fundMe.fund({ value: sendValue });
      const amount =
        await fundMe.addressToAmountFunded(
          deployer
        );
      const etherValue = ethers.utils.formatEther(
        amount.toString()
      );
      expect(parseInt(etherValue)).to.equal(1);
    });

    it("adds funder to funder array", async () => {
      await fundMe.fund({ value: sendValue });
      const funder = await fundMe.funders(0);
      console.log("fetched funders.");
      expect(funder).to.equal(deployer);
    });
  });
});
