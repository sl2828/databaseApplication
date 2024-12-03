// models/appointment.js
import mongoose from 'mongoose';

// Define the schema for appointments
const ownerSchema = new mongoose.Schema({
  _id: { type: String, required: true },   // owner SSN
  name: { type: String, required: true },
  email: { type: Date, required: true },
  phoneNumber: { type: String, required: true }
}, { versionKey: false });

// Create a model based on the schema
const Owner = mongoose.model('owner', ownerSchema);

export default Owner;