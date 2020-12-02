// Authentication
import authenticationQueries from './authentication/queries';
import authenticationMutations from './authentication/mutations';

// Configuration
import configQueries from './config/queries';

// Contract sources
import contractSourceQueries from './contract-source/queries';

// Credentials
import credentialsQueries from './credentials/queries';

// Tokens
import tokenMutations from './token/mutations';

// User
import userQueries from './user/queries';
import userMutations from './user/mutations';

const resolvers = {
  Query: {
    ...authenticationQueries,
    ...configQueries,
    ...contractSourceQueries,
    ...credentialsQueries,
    ...userQueries
  },
  Mutation: {
    ...authenticationMutations,
    ...tokenMutations,
    ...userMutations
  }
};

export default resolvers;
