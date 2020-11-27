import { gql } from 'apollo-server-express';

const typeDefs = gql`
  # Directives
  directive @auth on FIELD_DEFINITION
  directive @normalizeId on FIELD_DEFINITION
  directive @paginate on FIELD_DEFINITION

  # Custom scalar
  scalar Date

  # Types
  type Query {
    # Config
    terms: String!

    # Authentication
    login(userToLogin: UserToLogin!): LoggedUser!

    # Credentials
    getPaypalCredentials: PaypalCredentials! @auth

    # User
    userByToken: User! @auth

    # Contract sources
    contractSource(contractSourceId: ID!): ContractSource! @auth
  }

  type Mutation {
    # Authentication
    signUp(userToSignUp: UserToSignUp!): LoggedUser!
    emailVerify(token: String!): User! @auth
    requestPasswordToken(email: String!): Boolean!
    passwordRecovery(password: String!, token: String!): User!

    # User
    userEdit(userToEdit: UserToEdit!): User! @auth
  }

  # Common
  # Types
  type Info {
    prev: Int
    next: Int
    count: Int!
    pages: Int!
  }

  # Inputs
  input QueryParams {
    page: Int!
    pageSize: Int!
  }

  # Credentials
  # Types
  type PaypalCredentials {
    clientId: String!
    secret: String!
  }

  # User
  # Types
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    isGlobalAdmin: Boolean!
    emailVerified: Boolean!
  }

  type LoggedUser {
    token: String!
    user: User!
  }

  # Inputs
  input UserToLogin {
    email: String!
    password: String!
  }

  input UserToSignUp {
    email: String!
    password: String!
    firstName: String!
    lastName: String!
  }

  input UserToEdit {
    password: String
  }

  # Contract sources
  type ContractSource {
    id: ID!
    name: String!
    abi: String!
    bytecode: String!
    createdAt: Date!
  }
`;

export default typeDefs;
