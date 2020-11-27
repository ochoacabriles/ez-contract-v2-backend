import { User, Vendor } from '../../../db/models';

const validation = {
  userIsGlobalAdmin: async (userId) => {
    const { isGlobalAdmin } = await User.findOne({ _id: userId }, { isGlobalAdmin: 1 });
    if (!isGlobalAdmin) {
      throw new Error('unauthorized');
    };
    return;
  }
};

export default validation;
