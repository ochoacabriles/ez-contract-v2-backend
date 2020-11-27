import mongoose from 'mongoose';
import dotenv from 'dotenv';
import terms from '../seeds/terms';
import { Term } from '../models';

dotenv.config();

const updateTerms = async () => {
  const local = process.argv[process.argv.length - 1] === 'local';
  const mongoUri = local ? process.env.LOCAL_DB_URI : process.env.MONGODB_URI;
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  });

  // Drop old terms
  await Term.deleteMany();

  // Seed terms
  await Term.insertMany(terms);

  mongoose.connection.close();
  console.log('🤟  Terms updated!');
};

updateTerms();
