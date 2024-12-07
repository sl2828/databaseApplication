import express from 'express';
import Species from '../models/species.js'; // Import the Mongoose model

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();

// Get all appointments
router.get('/', async (req, res) => {
  try {
    const species = await Species.find();
    res.status(200).json(species);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching species' });
  }
});

// Get an appointment by ID
router.get('/:id', async (req, res) => {
  try {
    const species = await Species.findById(req.params.id);
    if (!species) {
      return res.status(404).json({ message: 'Species not found' });
    }
    res.status(200).json(species);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching species' });
  }
});

// Create a new appointment
router.post('/', async (req, res) => {
  try {
    const newSpecies = new Species(req.body);
    await newSpecies.save();
    res.status(201).json(newSpecies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating species' });
  }
});

// Update an appointment
router.put('/:id', async (req, res) => {
  try {
    const updatedSpecies = await Species.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedSpecies) {
      return res.status(404).json({ message: 'Species not found' });
    }
    res.status(200).json(updatedSpecies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating species.' });
  }
});

// Delete an appointment
router.delete('/:id', async (req, res) => {
  try {
    const deletedSpecies = await Species.findByIdAndDelete(req.params.id);
    if (!deletedSpecies) {
      return res.status(404).json({ message: 'Species not found' });
    }
    res.status(200).json({ message: 'Species deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting species' });
  }
});

export default router;