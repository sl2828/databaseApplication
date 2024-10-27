import Patient from "../models/patient.js";

export const getPatients = async (req, res) => {
    try {
        const patients = await Patient.find();

        res.status(200).json(patients);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPatient = async (req, res) => {
    const patient = req.body;

    const newPatient = new Patient(patient);

    try {
        await newPatient.save();

        res.status(201).json(newPatient);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}