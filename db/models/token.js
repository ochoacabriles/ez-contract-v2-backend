import { Schema, model } from 'mongoose'

const TokenSchema = new Schema({
  user: { type: Schema.Types.ObjectId, required: true, ref: 'User '},
  contract: { type: Schema.Types.ObjectId, required: true, ref: 'ContractSource' },
  network: { type: String, required: true },
  estimatedGas: { type: Number, required: true },
  gasUsed: { type: Number },
  address: { type: String },
  blockNumber: { type: Number },
  blockHash: { type: String },
  transactionHash: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  proprietaryAddress: { type: String, required: true },
  type: { type: String, enum: ['basic', 'minted'] },
  supply: { type: Number },
  name: { type: String },
  symbol: { type: String },
  decimals: { type: Number }
});

export default model('Token', TokenSchema);
