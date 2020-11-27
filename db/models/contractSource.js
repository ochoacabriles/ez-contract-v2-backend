import { Schema, model } from 'mongoose';

const ContractSourceSchema = new Schema({
  name: { type: String, required: true },
  abi: { type: String, required: true },
  bytecode: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now }
});

export default model('ContractSource', ContractSourceSchema);
