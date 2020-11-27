import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { users } from '../seeds';
import { User } from '../models';

dotenv.config();

const seed = async () => {
  const local = process.argv[process.argv.length - 1] === 'local';
  const mongoUri = local ? process.env.LOCAL_DB_URI : process.env.MONGODB_URI;
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  });

  // Seed users
  await User.insertMany(users);

  mongoose.connection.close();
  console.log('🤟  Database seeded!');
};

seed();
