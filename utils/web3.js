import Web3 from 'web3';

const endpoints = {
  mainnet: process.env.INFURA_MAINNET,
  ropsten: process.env.INFURA_ROPSTEN,
  rinkeby: process.env.INFURA_RYNKEBY,
  kovan: process.env.INFURA_KOVAN,
  goerli: process.env.INFURA_GOERLI,
  default: process.env.INFURA_MAINNET
};

const web3Client = (network, infuraApiKey) => {
  const endpoint = endpoints[network] || endpoints.default;

  const web3 = new Web3(
    new Web3.providers.HttpProvider(`${endpoint}${infuraApiKey}`)
  );
  return web3;
};

export default web3Client;
