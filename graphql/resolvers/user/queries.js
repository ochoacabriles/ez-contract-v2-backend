import { User } from '../../../db/models';

const userQueries = {
  userByToken: (_, {}, { userId }) => User.findOne({ _id: userId })
};

export default userQueries;
