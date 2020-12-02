import { User } from '../../../db/models';
import jwt from 'jsonwebtoken';
import { compareSync as comparePasswords } from 'bcryptjs';

const authenticationQueries = {
  login: async (_, { userToLogin: { email, password } }, { res }) => {
    try {
      const user = await User.findOne({ email: email.toLowerCase() });

      if (!user || !comparePasswords(password, user.password)) {
        throw new Error('Please check your data and try again');
      }

      const secret = res.app.get('jwtSecret');
      const token = jwt.sign({ id: user.id }, secret, { expiresIn: 86400 });

      res.cookie('token', token, {
        maxAge: 86400 * 1000,
        secure: !(process.env.STAGE === 'local'),
        domain: process.env.STAGE === 'local' ? 'localhost' : '.ez-contract.io'
      });

      const loggedUser = { 
        token,
        user
      };
      console.log(`login successful ${email}`);

      return loggedUser;
    } catch (err) {
      console.error('login error');
      console.error(err);
      throw new Error(err);
    }
  }
};

export default authenticationQueries;
