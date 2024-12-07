import express from "express";
import { MongoClient } from "mongodb";

const router = express.Router();

// MongoDB connection URI and database name
const uri = process.env.ATLAS_URI; // Replace with your MongoDB URI
const dbName = "veterinary"; // Replace with your database name

// Query Appointments Endpoint
router.post("/", async (req, res) => {
  const { species, startDate, endDate } = req.body;

  // Build the query object
  const query = {};
  if (species) query.species = species;
  if (startDate && endDate) {
    query.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
  } else if (startDate) {
    query.date = { $gte: new Date(startDate) };
  } else if (endDate) {
    query.date = { $lte: new Date(endDate) };
  }

  try {
    // Connect to MongoDB
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("appointments"); // Replace with your collection name

    // Execute the query and return results
    const results = await collection.find(query).toArray();
    res.json(results);
    await client.close();
  } catch (error) {
    console.error("Error executing query:", error.message);
    res.status(500).send("An error occurred while querying the database.");
  }
});

export default router;
