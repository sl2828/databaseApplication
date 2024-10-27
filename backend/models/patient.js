import mongoose from 'mongoose';

const patientSchema = mongoose.Schema({
    name: String,
    ownerSSN: Number,
    speciesName: String,
    age: Number,
    weight:Number,
});

const Patient = mongoose.model('Patient', patientSchema);

export default Patient;