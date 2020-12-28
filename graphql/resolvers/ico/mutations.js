import { Ico, Token } from '../../../db/models';
import confirmContract from '../utils/confirmation'

const icoMutations = {
  icoAdd: async (_, { icoToAdd }, { userId }) => {
    const newIco = {
      ...icoToAdd,
      user: userId
    };
    const ico = new Ico(newIco);

    // Update token to set flag isIco to true
    await Token.findByIdAndUpdate(icoToAdd.token, { $set: { isIco: true } });

    return ico.save();
  },
  icoConfirm: async (_, { icoId }, { res }) => {
    const ico = await Ico.findById(icoId).populate('token');

    const { transactionHash, token: { network }, blockNumber: isConfirmed } = ico;

    if (isConfirmed) {
      return ico;
    }
    
    const { 
      blockHash, 
      blockNumber, 
      gasUsed, 
      contractAddress 
    } = await confirmContract(network, transactionHash, res);

    ico.blockHash = blockHash;
    ico.blockNumber = blockNumber;
    ico.gasUsed = gasUsed;
    ico.address = contractAddress;

    return ico.save();
  },
  icoFund: async (_, { icoId, fundingTransactionHash }, { res }) => 
    Ico.findByIdAndUpdate(icoId, { $set: { fundingTransactionHash } }, { new: true })
};

export default icoMutations;
