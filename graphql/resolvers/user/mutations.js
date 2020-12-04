import { User } from '../../../db/models';

const userMutations = {
  userEdit: (_, { userToEdit }, { userId }) => 
    User.findByIdAndUpdate(userId, { $set: userToEdit }, { new: true })
};

export default userMutations;
