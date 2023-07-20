const { network, run } = require("hardhat");
const {
  networkConfig,
  developmentChains,
} = require("../helper-hardhat-config");
const {
  verify,
} = require("../utils/verifyContract");
require("dotenv").config();

module.exports = async ({
  getNamedAccounts,
  deployments,
}) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainID = network.config.chainId;
  /*here we parameterized the interface address
  now whatever chain we are on we can get the eth/usd
  price on that chain*/

  let ethUsdPriceFeedAddress;
  if (developmentChains.includes(network.name)) {
    const ethUsdAggregator =
      await deployments.get("MockV3Aggregator");
    ethUsdPriceFeedAddress =
      ethUsdAggregator.address;
  } else {
    ethUsdPriceFeedAddress =
      networkConfig[chainID]["address"];
  }

  const args = [ethUsdPriceFeedAddress];
  //This is deploying syntax for hardhat-deploy
  const fundMe = await deploy("FundMe", {
    from: deployer,
    args: args,
    log: true,
    waitConfirmations:
      network.config.blockConfirmations || 4,
  });

  //verifying if we deploy it on an actual network
  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    await verify(fundMe.address, args);
  }

  console.log(
    "------------------------------------------------"
  );
};

module.exports.tags = ["all", "fund-me"];
