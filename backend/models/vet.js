// models/appointment.js
import mongoose from 'mongoose';

// Define the schema for appointments
const vetSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  yearsOfExperience: { type: Number, required: true }
}, { versionKey: false });

// Create a model based on the schema
const Vet = mongoose.model('Vet', vetSchema);

export default Vet;