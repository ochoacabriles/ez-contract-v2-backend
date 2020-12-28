import { Ico } from '../../../db/models';

const icoQueries = {
  icosByUser: async (_, { page = 1, pageSize = 10 }, { userId }) => {
    const [results, count] = await Promise.all([
      Ico.find({ user: userId })
        .skip(pageSize * (page - 1))
        .limit(pageSize),
      Ico.countDocuments({ user: userId })
    ]);

    return [results, count, page, pageSize];
  }
};

export default icoQueries;
