import Web3 from 'web3';

const endpoints = {
  mainnet: process.env.INFURA_MAINNET,
  ropsten: process.env.INFURA_ROPSTEN,
  rinkeby: process.env.INFURA_RYNKEBY,
  kovan: process.env.INFURA_KOVAN,
  goerli: process.env.INFURA_GOERLI,
  local: process.env.LOCAL_URL
};

const web3Client = (network, infuraApiKey) => {
  const endpoint = network === 'local'
    ? endpoints.default
    : `${endpoints[network]}${infuraApiKey}`;
console.log({ endpoint })
  const web3 = new Web3(
    new Web3.providers.HttpProvider(endpoint)
  );
  return web3;
};

export default web3Client;
