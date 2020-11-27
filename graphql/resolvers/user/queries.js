import { User } from '../../../db/models';

const userQueries = {
  userByToken: (_, {}, { userId }) => User.findOne({ _id: userId }).populate('cities').populate('cart.product')
};

export default userQueries;
