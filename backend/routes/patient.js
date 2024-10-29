import express from "express";

// This will help us connect to the database
import db from "../db/connection.js";

// // This help convert the id from string to ObjectId for the _id.
// import { ObjectId } from "mongodb";

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();

// This section will help you get a list of all the records.
router.get("/", async (req, res) => {
  try {
    const collection = db.collection("patient");
    const results = await collection.find({}).toArray();
    res.status(200).send(results);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching patients.");
  }
});

// This section will help you get a single record by id
router.get("/:name/:ownerSSN", async (req, res) => {
  let collection = db.collection("patient");
  let query = { "_id.name": req.params.name, "_id.ownerSSN": req.params.ownerSSN };
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// This section will help you create a new record.
router.post("/", async (req, res) => {
  try {
    const newDocument = {
        _id: {
            name: req.body.name,
            ownerSSN: req.body.ownerSSN
        },
        speciesName: req.body.speciesName,
        age: req.body.age,
        weight: req.body.weight
    };

    let collection = db.collection("patient");
    const existingRecord = await collection.findOne({ "_id.name": newDocument._id.name, "_id.ownerSSN": newDocument._id.ownerSSN });
    if (existingRecord) {
      return res.status(400).send("Patient already exists. Please use a unique ID.");
    }

    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding new patient.");
  }
});

// This section will help you update a record by id.
router.patch("/:name/:ownerSSN", async (req, res) => {
  try {
    const query = { "_id.name": req.params.name, "_id.ownerSSN": req.params.ownerSSN  };
    const updates = {
      $set: {
        speciesName: req.body.speciesName,
        age: req.body.age,
        weight: req.body.weight
      },
    };

    let collection = db.collection("patient");
    let result = await collection.updateOne(query, updates);
    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating record");
  }
});

  






// This section will help you delete a record
router.delete("/:name/:ownerSSN", async (req, res) => {
  try {
    const query = { "_id.name": req.params.name, "_id.ownerSSN": req.params.ownerSSN };

    const collection = db.collection("patient");
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting patient");
  }
});

export default router;