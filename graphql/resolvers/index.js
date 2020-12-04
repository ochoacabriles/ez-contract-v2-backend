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
import tokenQueries from './token/queries';
import tokenMutations from './token/mutations';
import tokenFields from './token/fields';

// User
import userQueries from './user/queries';
import userMutations from './user/mutations';
import contractSourceFields from './contract-source/fields';

const resolvers = {
  Query: {
    ...authenticationQueries,
    ...configQueries,
    ...contractSourceQueries,
    ...credentialsQueries,
    ...tokenQueries,
    ...userQueries
  },
  Mutation: {
    ...authenticationMutations,
    ...tokenMutations,
    ...userMutations
  },
  // Fields
  ContractSource: {
    ...contractSourceFields
  },
  Token: {
    ...tokenFields
  }
};

export default resolvers;
