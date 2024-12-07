import express from "express";
import Patient from '../models/patient.js'; // Import the Mongoose model


const router = express.Router();

// This section will help you get a list of all the records.
router.get("/", async (req, res) => {
  try {
    const collection = await Patient.find();
    res.status(200).json(collection);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching patients."});
  }
});


// This section will help you get a single record by id
router.get("/:name/:ownerSSN", async (req, res) => {
  let query = { "_id.name": req.params.name, "_id.ownerSSN": req.params.ownerSSN };
  let result = await Patient.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.status(200).json(result);
});


// This section will help you create a new record.
router.post('/', async (req, res) => {
  try {
    const newAppointment = new Patient(req.body);
    await newAppointment.save();
    res.status(201).json(newAppointment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Patient with same ID exists.' });
  }
});

// This section will help you update a record by id.
router.patch("/:name/:ownerSSN", async (req, res) => {
  try {
    const query = { 
      "_id.name": req.params.name, 
      "_id.ownerSSN": req.params.ownerSSN 
    };

    const updates = {
      $set: {
        speciesName: req.body.speciesName,
        age: req.body.age,
        weight: req.body.weight
      },
    };

    let result = await Patient.updateOne(query, updates);

    if (result.modifiedCount === 0) {
      return res.status(404).send("No matching record found or no changes made.");
    }

    res.status(200).send("Record updated successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating record");
  }
});

// This section will help you delete a record
router.delete("/:name/:ownerSSN", async (req, res) => {
  try {
    const query = { 
      "_id.name": req.params.name, 
      "_id.ownerSSN": req.params.ownerSSN 
    };

    // Use the Patient model to delete a single record based on the query
    const result = await Patient.deleteOne(query);

    if (result.deletedCount === 0) {
      return res.status(404).send("Patient not found");
    }

    res.status(200).send("Patient deleted successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting patient");
  }
});

export default router;