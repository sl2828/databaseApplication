// models/appointment.js
import mongoose from 'mongoose';

// Define the schema for appointments
const speciesSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  description: { type: String, required: true }
}, { versionKey: false });

// Create a model based on the schema
const Species = mongoose.model('Species', speciesSchema);

export default Species;