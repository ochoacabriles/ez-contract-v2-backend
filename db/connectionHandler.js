import Mongoose from 'mongoose';

let isConnected;

const connectToDatabase = async (mongoUri) =>  {
  if (isConnected) {
    console.log('=> Using existing DB connection');
    return;
  }
  console.log('=> Using new DB connection');
  
  try {
    const db = await Mongoose.connect(mongoUri);
  
    isConnected = db.connections[0].readyState;
    console.log('=> Connection successful');
    return;
  } catch (err) {
    throw new Error(err);
  };
};

export default connectToDatabase;
