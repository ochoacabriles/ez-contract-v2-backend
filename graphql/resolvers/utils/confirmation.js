import web3Client from '../../../utils/web3';

const confirmContract = async (network, transactionHash, res) => {
  const infuraApiKey = res.app.get('infuraApiKey');
  const web3 = web3Client(network, infuraApiKey);

  const transaction = await web3.eth.getTransactionReceipt(transactionHash);

  if (!transaction) {
    throw new Error('Contract is not confirmed yet. Try again later');
  }

  const { contractAddress, blockHash, blockNumber, gasUsed } = transaction;

  return { contractAddress, blockHash, blockNumber, gasUsed };
};

export default confirmContract;
