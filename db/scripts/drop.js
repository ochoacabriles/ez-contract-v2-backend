import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const drop = async () => {
  const local = process.argv[process.argv.length - 1] === 'local';
  const mongoUri = local ? process.env.LOCAL_DB_URI : process.env.MONGODB_URI;
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  });

  await mongoose.connection.dropDatabase();

  await mongoose.connection.close();
  console.log('✅  Database clean!');
};

drop();
