import express from 'express';
import Owner from '../models/owner.js'; // Import the Mongoose model

// // This help convert the id from string to ObjectId for the _id.
// import { ObjectId } from "mongodb";

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();

// Get all appointments
router.get('/', async (req, res) => {
  try {
    const owners = await Owner.find();
    res.status(200).json(owners);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching owners' });
  }
});

// Get an appointment by ID
router.get('/:id', async (req, res) => {
  try {
    const owner = await Owner.findById(req.params.id);
    if (!owner) {
      return res.status(404).json({ message: 'Owner not found' });
    }
    res.status(200).json(owner);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching owner' });
  }
});

// Create a new appointment
router.post('/', async (req, res) => {
  try {
    const newOwner = new Owner(req.body);
    await newOwner.save();
    res.status(201).json(newOwner);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating owner' });
  }
});

// Update an appointment
router.put('/:id', async (req, res) => {
  try {
    const updatedOwner = await Owner.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedOwner) {
      return res.status(404).json({ message: 'Owner not found' });
    }
    res.status(200).json(updatedOwner);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating owner.' });
  }
});

// Delete an appointment
router.delete('/:id', async (req, res) => {
  try {
    const deletedOwner = await Owner.findByIdAndDelete(req.params.id);
    if (!deletedOwner) {
      return res.status(404).json({ message: 'Owner not found' });
    }
    res.status(200).json({ message: 'Owner deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting owner' });
  }
});

export default router;