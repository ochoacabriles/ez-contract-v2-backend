import { User, ContractSource } from '../../../db/models';

const tokenFields = {
  user: ({ user }) => User.findById(user),
  contract: ({ contract }) => ContractSource.findById(contract, { abi: 0 })
};

export default tokenFields;
