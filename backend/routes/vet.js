import express from 'express';
import Vet from '../models/vet.js'; // Import the Mongoose model

// // This help convert the id from string to ObjectId for the _id.
// import { ObjectId } from "mongodb";

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();

// Get all vets
router.get('/', async (req, res) => {
  try {
    const vets = await Vet.find();
    res.status(200).json(vets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching vets' });
  }
});

// Get an vet by ID
router.get('/:id', async (req, res) => {
  try {
    const vet = await Vet.findById(req.params.id);
    if (!vet) {
      return res.status(404).json({ message: 'Vet not found' });
    }
    res.status(200).json(vet);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching vet' });
  }
});

// Create a new vet
router.post('/', async (req, res) => {
  try {
    const newVet = new Vet(req.body);
    await newVet.save();
    res.status(201).json(newVet);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating vet' });
  }
});

// Update an vet
router.put('/:id', async (req, res) => {
  try {
    const updatedVet = await Vet.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedVet) {
      return res.status(404).json({ message: 'Vet not found' });
    }
    res.status(200).json(updatedVet);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating vet' });
  }
});

// Delete an vet
router.delete('/:id', async (req, res) => {
  try {
    const deletedVet = await Vet.findByIdAndDelete(req.params.id);
    if (!deletedVet) {
      return res.status(404).json({ message: 'Vet not found' });
    }
    res.status(200).json({ message: 'Vet deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting vet' });
  }
});

export default router;