import { gql } from 'apollo-server-express';

const typeDefs = gql`
  # Directives
  directive @auth on FIELD_DEFINITION
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

    # Tokens
    token(tokenId: ID!): Token!
    tokensByUser(isIco: Boolean, page: Int, pageSize: Int): Tokens! @auth @paginate

    # Icos
    icosByUser(page: Int, pageSize: Int): Icos! @auth @paginate

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

    # Token
    tokenAdd(tokenToAdd: TokenToAdd!): Token! @auth
    tokenConfirm(tokenId: ID!): Token! @auth

    # Ico
    icoAdd(icoToAdd: IcoToAdd!): Ico! @auth
    icoConfirm(icoId: ID!): Ico! @auth
    icoFund(icoId: ID!, fundingTransactionHash: String!): Ico! @auth

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

  # Token
  type Token {
    id: ID!
    user: User!
    contract: ContractSource!
    network: String!
    estimatedGas: Int!
    address: String
    blockNumber: Int
    createdAt: Date!
    proprietaryAddress: String!
    type: TokenType!
    supply: Int
    name: String!
    symbol: String!
    decimals: Int!
    blockHash: String
    isIco: Boolean!
  }

  type Tokens {
    info: Info!
    results: [Token]!
  }

  input TokenToAdd {
    contract: ID!
    address: String
    transactionHash: String!
    network: String!
    estimatedGas: Int!
    proprietaryAddress: String!
    type: TokenType!
    supply: Int!
    symbol: String!
    name: String!
    decimals: Int!
  }

  input TokenToConfirm {
    address: String
    blockNumber: Int!
    blockHash: String!
    gasUsed: Int!
  }

  enum TokenType {
    basic
    minted
  }

  # Ico
  type Ico {
    id: ID!
    user: User!
    contract: ContractSource!
    token: Token!
    estimatedGas: Int!
    gasUsed: Int
    address: String
    blockNumber: Int
    blockHash: String
    transactionHash: String!
    createdAt: Date!
    proprietaryAddress: String!
    rate: Float!
    fundingTransactionHash: String
  }

  type Icos {
    info: Info!
    results: [Ico]!
  }

  input IcoToAdd {
    contract: ID!
    token: ID!
    address: String
    transactionHash: String!
    estimatedGas: Int!
    proprietaryAddress: String!
    rate: Float!
  }
`;

export default typeDefs;
