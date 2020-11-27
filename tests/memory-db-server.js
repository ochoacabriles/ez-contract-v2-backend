/*
  MongoDB Memory Server handler.
  Used to create and destroy memory DB connection for backend tests.
  No need to change.
*/
import mongoose from 'mongoose';

// Should disable eslint for MongoMemoryServer import, to allow it to be in dev-dependencies.
import { MongoMemoryServer } from 'mongodb-memory-server';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;

const mongoServer = new MongoMemoryServer({
  binary: { version: '4.2.0' }
});

const createDBConnection = async () => {
  mongoose.Promise = Promise;
  const mongoUri = await mongoServer.getConnectionString();
  const mongooseOpts = {
    autoReconnect: true,
    reconnectTries: 5,
    reconnectInterval: 1000
  };

  await mongoose.connect(mongoUri, mongooseOpts);
};

const stopDBConnection = async () => {
  await mongoose.connection.close();
  return mongoServer.stop();
};

export { createDBConnection, stopDBConnection };
