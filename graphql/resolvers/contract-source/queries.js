import { ContractSource } from '../../../db/models';

const contractSourceQueries = {
  contractSource: (_, { contractSourceId }) => ContractSource.findById(contractSourceId)
};

export default contractSourceQueries;
