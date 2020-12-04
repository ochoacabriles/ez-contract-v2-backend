import { ContractSource } from '../../../db/models';

const contractSourceFields = {
  abi: async ({ id }) => {
    const { abi } = await ContractSource.findById(id, { abi: 1 });
    return abi;
  }
};

export default contractSourceFields;
