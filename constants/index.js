const contractAddresses = require("./contractAddresses.json");
const abi = require("./abi.json");

const supportedChains = ["31337", "5", "80001", "43113"];

module.exports = {
  contractAddresses,
  abi,
  supportedChains,
};
