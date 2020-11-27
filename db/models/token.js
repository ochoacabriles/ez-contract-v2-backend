import { Schema, model } from 'mongoose';
import crypto from 'crypto';

const tokenSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  token: { type: String, default: () => crypto.randomBytes(24).toString('hex'), required: true },
  type: { type: String, enum: ['PASSWORD', 'EMAIL'], required: true },
  sentAt: { type: Date },
  createdAt: { type: Date, required: true, default: Date.now, expires: 43200 }
})

export default model('Token', tokenSchema);
