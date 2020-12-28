import { Token } from '../../../db/models';

const tokenQueries = {
  token: (_, { tokenId }) => Token.findById(tokenId),
  tokensByUser: async (_, { isIco, page = 1, pageSize = 10 }, { userId }) => {
    const query = { user: userId };
    if (typeof isIco !== undefined) {
      query.isIco = isIco;
    }
    const [results, count] = await Promise.all([
      Token.find(query)
        .skip(pageSize * (page - 1))
        .limit(pageSize),
      Token.countDocuments(query)
    ]);

    return [results, count, page, pageSize];
  }
};

export default tokenQueries;
