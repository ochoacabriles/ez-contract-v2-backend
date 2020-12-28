// Authentication
import authenticationQueries from './authentication/queries';
import authenticationMutations from './authentication/mutations';

// Configuration
import configQueries from './config/queries';

// Contract source
import contractSourceQueries from './contract-source/queries';

// Credentials
import credentialsQueries from './credentials/queries';

// Token
import tokenQueries from './token/queries';
import tokenMutations from './token/mutations';
import tokenFields from './token/fields';

// Ico
import icoQueries from './ico/queries';
import icoMutations from './ico/mutations';
import icoFields from './ico/fields';

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
    ...icoQueries,
    ...userQueries
  },
  Mutation: {
    ...authenticationMutations,
    ...tokenMutations,
    ...icoMutations,
    ...userMutations
  },
  // Fields
  ContractSource: {
    ...contractSourceFields
  },
  Token: {
    ...tokenFields
  },
  Ico: {
    ...icoFields
  }
};

export default resolvers;
