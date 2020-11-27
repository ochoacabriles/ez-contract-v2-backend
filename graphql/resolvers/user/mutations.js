import { User } from '../../../db/models';

const userMutations = {
  userEdit: (_, { userToEdit }, { userId }) => 
    User.findByIdAndUpdate(userId, { $set: userToEdit }, { new: true })
      .populate('cities')
      .populate('cart.product')
};

export default userMutations;
