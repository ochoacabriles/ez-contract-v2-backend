import { Token } from '../../../db/models';
import confirmContract from '../utils/confirmation';

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

    const { transactionHash, network, blockNumber: isConfirmed } = token;

    if (isConfirmed) {
      return token;
    }
    
    const {
      contractAddress,
      blockHash,
      blockNumber,
      gasUsed
    } = await confirmContract(network, transactionHash, res);

    token.blockHash = blockHash;
    token.blockNumber = blockNumber;
    token.gasUsed = gasUsed;
    token.address = contractAddress;

    return token.save();
  }
};

export default tokenMutations;
