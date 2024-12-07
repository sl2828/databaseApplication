// models/appointment.js
import mongoose from 'mongoose';

// Define the schema for appointments
const appointmentSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  petName: { type: String, required: true },
  date: { type: Date, required: true },
  ownerSSN: { type: String, required: true },
  time: { type: String, required: true },
  vetLicenseNumber: { type: String, required: true }
}, { versionKey: false });

// Create a model based on the schema
const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;