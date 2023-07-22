const {
  ethers,
  deployments,
  getNamedAccounts,
  network,
} = require("hardhat");
const { expect } = require("chai");
const {
  developmentChains,
} = require("../../helper-hardhat-config");

const sendValue = ethers.utils.parseEther("0.05");
developmentChains.includes(network.name)
  ? describe.skip
  : describe("fundMe", () => {
      let fundMe, deployer;
      beforeEach(async () => {
        deployer = (await getNamedAccounts())
          .deployer;
        fundMe = await ethers.getContract(
          "FundMe",
          deployer
        );
      });

      it("lets people fund and let deployer withdraw", async () => {
        console.log("funding...");
        const tx = await fundMe.fund({
          value: sendValue,
          gasLimit: 120000,
        });
        await tx.wait(2);
        console.log("funded.");
        console.log("withdrawing...");
        const transaction =
          await fundMe.withdraw();
        await transaction.wait();
        console.log("withdrew eth.");
        const fundMeBalance =
          await fundMe.provider.getBalance(
            fundMe.address
          );
        console.log(fundMeBalance);
        console.log("point 1");
        expect(fundMeBalance.toString()).to.equal(
          "0"
        );
      });
    });
