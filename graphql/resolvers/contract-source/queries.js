import { ContractSource } from '../../../db/models';

const contractSourceQueries = {
  contractSource: (_, { contractSourceId }) => ContractSource.findById(contractSourceId, { abi: 0 })
};

export default contractSourceQueries;
