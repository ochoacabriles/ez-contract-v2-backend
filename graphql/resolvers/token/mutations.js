import { Token } from '../../../db/models';
import web3Client from '../../../utils/web3';

const tokenMutations = {
  tokenAdd: async (_, { tokenToAdd }, { userId }) => {
    const newToken = {
      ...tokenToAdd,
      user: userId
    };
    const token = new Token(newToken);
    return token.save();
  },
  tokenConfirm: async (_, { tokenId }, { res }) => {
    const token = await Token.findById(tokenId);

    const { transactionHash, network, address } = token;

    if (address) {
      return token;
    }
    
    const infuraApiKey = res.app.get('infuraApiKey');
    const web3 = web3Client(network, infuraApiKey);

    const transaction = await web3.eth.getTransactionReceipt(transactionHash);

    if (!transaction) {
      throw new Error('Contract is not confirmed yet. Try again later');
    }

    const { contractAddress, blockHash, blockNumber, gasUsed } = transaction;
    token.blockHash = blockHash;
    token.blockNumber = blockNumber;
    token.gasUsed = gasUsed;
    token.address = contractAddress;

    return token.save();
  }
};

export default tokenMutations;
