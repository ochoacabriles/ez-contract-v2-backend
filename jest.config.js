/*
  File to config jest to work with
  MongoDB memory server.

  No need to change it.
*/

module.exports = {
  preset: '@shelf/jest-mongodb',
  collectCoverage: true,
  collectCoverageFrom: ['**/graphql/resolvers/**'],
  coverageReporters: ['text'],
  modulePathIgnorePatterns: ['.__mocks__.*']
};
