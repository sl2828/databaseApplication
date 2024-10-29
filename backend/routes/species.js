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
    const collection = db.collection("species");
    const results = await collection.find({}).toArray();
    res.status(200).send(results);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching species.");
  }
});

// This section will help you get a single record by id
router.get("/:id", async (req, res) => {
  let collection = db.collection("species");
  let query = { _id: req.params.id };
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});


// This section will help you create a new record.
router.post("/", async (req, res) => {
  try {
    const newDocument = {
      _id: req.body.id, // ID is species name
      description: req.body.description
    };

    let collection = db.collection("species");
    const existingRecord = await collection.findOne({ _id: newDocument._id });
    if (existingRecord) {
      return res.status(400).send("Species already exists. Please use a unique ID.");
    }

    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding new species.");
  }
});

// This section will help you update a record by id.
router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: req.params.id };
    const updates = {
      $set: {
        description: req.body.description
      },
    };

    let collection = db.collection("species");
    let result = await collection.updateOne(query, updates);
    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating species");
  }
});


// This section will help you delete a record
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: req.params.id };

    const collection = db.collection("species");
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting species");
  }
});

export default router;