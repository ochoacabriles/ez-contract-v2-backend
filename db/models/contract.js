import { Schema, model } from 'mongoose'

const ContractSchema = new Schema({
  type: { type: String, required: true, enum: ['erc20, crowdsale'] },
  contract: { type: Schema.Types.ObjectId, required: true, ref: 'ContractSource' },
  deploymentGas: { type: Number, required: true },
  address: { type: String, required: true },
  blockCreated: { type: Number, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  proprietaryAddress: { type: String, required: true },
  // Atrributes if type is token
  tokenType: { type: String, enum: ['basic', 'minted'] },
  tokenSupply: { type: Number },
  tokenName: { type: String },
  tokenSymbol: { type: String },
  tokenDecimals: { type: Number },
  // Attributes if type is crowdsale
  crowdsaleType: { type: String, enum: ['basic', 'minted'] },
  rate: { type: Number }
});

export default model('Contract', ContractSchema);
