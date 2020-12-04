import { User, RecoveryToken } from '../../../db/models';
import jwt from 'jsonwebtoken';
import { hashSync as hash } from 'bcryptjs';
import emailSend from '../utils/emailSend';

const authenticationMutations = {
  signUp: async (_, { userToSignUp }, { res }) => {
    try {
      const newUser = { ...userToSignUp };
      newUser.password = hash(userToSignUp.password, 10);
      newUser.email = userToSignUp.email.toLowerCase();

      const user = new User(newUser);
      await user.save();

      const secret = res.app.get('jwtSecret');
      const token = jwt.sign({ id: user.id }, secret, { expiresIn: 86400 });

      res.cookie('token', token, {
        maxAge: 86400 * 1000,
        secure: false, // Should change when domain is configured
        domain: undefined // Should change when domain is configured
      });

      const verificationToken = new RecoveryToken({ userId: user._id, type: 'EMAIL' });
      await verificationToken.save();

      const loggedUser = { token, user };
      console.log(`signUp successful ${user.email}`);

      return loggedUser;
    } catch (err) {
      console.error('signUp error');
      console.error(err);
      throw new Error(err);
    }
  },
  emailVerify: async (_, { token }, { userId }) => {
    const user = await User.findById(userId);
    if (user.emailVerified) {
      return user;
    }
    const isTokenValid = await RecoveryToken.findOneAndDelete({ userId, token, type: 'EMAIL' });
    if (!isTokenValid) {
      throw new Error('invalidToken');
    }
    user.emailVerified = true;
    return user.save();
  },
  requestPasswordToken: async (_, { email }) => {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('invalidEmail');
    }
    const { _id: userId } = user;
    let token = await RecoveryToken.findOne({ userId, type: 'PASSWORD' });
    if (!token) {
      const newToken = new RecoveryToken({ userId, type: 'PASSWORD' });
      await newToken.save();
      token = newToken;
    }
    if (!token.sentAt || (token.sentAt && (new Date().getTime() - token.sentAt.getTime()) < 600000)) {
      token.sentAt = new Date();
      await token.save();
      return emailSend.passwordRecovery(email, token.token);
    }
    return true;
  },
  passwordRecovery: async (_, { password, token }) => {
    const { userId } = await RecoveryToken.findOneAndDelete({ token, type: 'PASSWORD' });
    if (!userId) {
      throw new Error('invalidToken');
    }
    const hashedPassword = hash(password, 10);
    return User.findByIdAndUpdate(userId, { $set: { password: hashedPassword } });
  }
};

export default authenticationMutations;
