import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  email: { type: String, unique: true, index: true, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  emailVerified: { type: Boolean, default: false, required: true },
  verfiedAt: { type: Date },
  isGlobalAdmin: { type: Boolean, default: false, required: true },
  contracts: [{ type: Schema.Types.ObjectId, ref: 'Contract' }]
});

export default model('User', UserSchema);
