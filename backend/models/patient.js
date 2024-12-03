// models/appointment.js
import mongoose from 'mongoose';

// Define the schema for appointments
const patientSchema = new mongoose.Schema({
  _id: {
    type: new mongoose.Schema({
      name: {type: String, required: true,},
      ownerSSN: {type: String, required: true,}
    }),
    required: true,
  },
  speciesName: { type: String, required: true },
  age: { type: Number, required: true },
  weight: { type: Number, required: true },
}, {_id: true}, { versionKey: false });

// Create a model based on the schema
const Patient = mongoose.model('patient', patientSchema);

export default Patient;