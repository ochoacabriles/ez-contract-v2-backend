import { Token } from '../../../db/models';

const tokenMutations = {
  tokenAdd: async (_, { tokenToAdd }, { userId }) => {
    console.log({ tokenToAdd })
    const newToken = {
      ...tokenToAdd,
      user: userId
    };
    const token = new Token(newToken);
    return token.save();
  },
  tokenConfirm: (_, { tokenId, tokenToConfirm }) => 
    Token.findByIdAndUpdate(tokenId, { $set: { ...tokenToConfirm } }, { new: true })
};

export default tokenMutations;
