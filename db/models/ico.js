import { Schema, model } from 'mongoose'

const IcoSchema = new Schema({
  user: { type: Schema.Types.ObjectId, required: true, ref: 'User '},
  contract: { type: Schema.Types.ObjectId, required: true, ref: 'ContractSource' },
  token: { type: Schema.Types.ObjectId, required: true, ref: 'Token' },
  estimatedGas: { type: Number, required: true },
  gasUsed: { type: Number },
  address: { type: String },
  blockNumber: { type: Number },
  blockHash: { type: String },
  transactionHash: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  proprietaryAddress: { type: String, required: true },
  type: { type: String, enum: ['basic', 'minted'] },
  rate: { type: Number },
  fundingTransactionHash: { type: String }
});

export default model('Ico', IcoSchema);
