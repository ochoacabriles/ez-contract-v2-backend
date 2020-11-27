import { Schema, model } from 'mongoose';

const termSchema = new Schema({
  terms: { type: String, required: true }
});

export default model('Term', termSchema);
