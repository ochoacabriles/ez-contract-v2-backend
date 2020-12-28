import { User, ContractSource, Token } from '../../../db/models';

const icoFields = {
  user: ({ user }) => User.findById(user),
  contract: ({ contract }) => ContractSource.findById(contract, { abi: 0 }),
  token: ({ token }) => Token.findById(token)
};

export default icoFields;
