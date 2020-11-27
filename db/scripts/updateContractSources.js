import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { contractSources } from '../seeds';
import { ContractSource } from '../models';

dotenv.config();

const updateContractSources = async () => {
  const local = process.argv[process.argv.length - 1] === 'local';
  const mongoUri = local ? process.env.LOCAL_DB_URI : process.env.MONGODB_URI;
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  });

  // Drop old terms
  await ContractSource.deleteMany();

  // Seed terms
  await ContractSource.insertMany(contractSources);

  mongoose.connection.close();
  console.log('🤟  Contract sources updated!');
};

updateContractSources();
