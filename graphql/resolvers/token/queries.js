import { Token } from '../../../db/models';

const tokenQueries = {
  tokensByUser: async (_, { page = 1, pageSize = 10 }, { userId }) => {
    const [results, count] = await Promise.all([
      Token.find({ user: userId })
        .skip(pageSize * (page - 1))
        .limit(pageSize),
      Token.countDocuments({ user: userId })
    ]);

    return [results, count, page, pageSize];
  }
};

export default tokenQueries;
