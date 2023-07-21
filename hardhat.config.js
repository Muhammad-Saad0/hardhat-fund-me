require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();
require("solidity-coverage");
require("hardhat-deploy");

const RPC_URL = process.env.SEPOLIA_RPC_URL;
const ACCOUNT_PRIVATE_KEY =
  process.env.ACCOUNT_PRIVATE_KEY;
const ETHERSCAN_API_KEY =
  process.env.ETHERSCAN_API_KEY;
const COINMARKETCAP_API_KEY =
  process.env.COIN_MARKETCAP_API;

module.exports = {
  solidity: {
    compilers: [
      { version: "0.8.19" },
      { version: "0.6.6" },
    ],
  },
  networks: {
    sepolia: {
      url: RPC_URL,
      accounts: [ACCOUNT_PRIVATE_KEY],
      chainId: 11155111,
      blockConfirmations: 3,
    },
    localhost: {
      url: "http://127.0.0.1:8545/",
      chainId: 31337,
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  gasReporter: {
    enabled: false,
    outputFile: "gas-report.txt",
    noColors: true,
    currency: "USD",
    coinmarketcap: COINMARKETCAP_API_KEY,
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
    user: {
      default: 1,
    },
  },
};
