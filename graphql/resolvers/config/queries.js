import { Term } from '../../../db/models';

const configQueries = {
  terms: async () => {
    const { terms } = await Term.findOne({});
    return terms;
  }
};

export default configQueries;
