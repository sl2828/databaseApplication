import express from 'express';
import Appointment from '../models/appointment.js'; // Import the Mongoose model

// // This help convert the id from string to ObjectId for the _id.
// import { ObjectId } from "mongodb";

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();

// Get all appointments
router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching appointments' });
  }
});

// Get an appointment by ID
router.get('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.status(200).json(appointment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching appointment' });
  }
});

// Create a new appointment
router.post('/', async (req, res) => {
  console.log("Trying to CREATE an appointment");
  console.log(req.body);
  try {
    const newAppointment = new Appointment(req.body);
    await newAppointment.save();
    res.status(201).json(newAppointment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating appointment' });
  }
});

// Update an appointment
router.patch('/:id', async (req, res) => {
  console.log("Trying to PATCH (partially update) an appointment");
  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id, // The ID of the appointment to update
      req.body,      // The data to update
      { new: true, runValidators: true } // Return the updated document
    );
    if (!updatedAppointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.status(200).json(updatedAppointment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error partially updating appointment' });
  }
});


// Delete an appointment
router.delete('/:id', async (req, res) => {
  try {
    const deletedAppointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!deletedAppointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.status(200).json({ message: 'Appointment deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting appointment' });
  }
});

export default router;