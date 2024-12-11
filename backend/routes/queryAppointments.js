import express from "express";
import { MongoClient } from "mongodb";

const router = express.Router();

// MongoDB connection URI and database name
const uri = process.env.ATLAS_URI; // Replace with your MongoDB URI
const dbName = "veterinary"; // Replace with your database name

// Query Appointments Endpoint
router.post("/", async (req, res) => {
  const { species, startDate, endDate } = req.body;

  try {
    // Connect to MongoDB
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("appointments"); // Replace with your collection name

    // Execute the query and return results
    const results = await collection.aggregate([
      // Join with the 'patients' collection to get pet details
      {
        $lookup: {
          from: "patients",
          localField: "petName",
          foreignField: "_id.name",
          as: "petDetails"
        }
      },
      {
        $unwind: "$petDetails"
      },
      // Join with the 'vets' collection to get vet details
      {
        $lookup: {
          from: "vets",
          localField: "vetLicenseNumber",
          foreignField: "_id",
          as: "vetDetails"
        }
      },
      {
        $unwind: "$vetDetails"
      },
      // Filter by date range and species
      {
        $match: {
          "petDetails.speciesName": species, // Replace with desired species name
          date: {
            $gte: new Date(startDate), // Replace with start date
            $lte: new Date(endDate)    // Replace with end date
          }
        }
      },
      // Group and calculate averages
      {
        $group: {
          _id: null,
          averageWeight: { $avg: "$petDetails.weight" },
          averageYearsOfExperience: { $avg: "$vetDetails.yearsOfExperience" }
        }
      }
    ]).toArray();

    const futureDate = new Date(endDate); // A specific future date
    console.log(futureDate);
    const pastDate = new Date(startDate); // A specific future date
    console.log(pastDate);
    console.log(species)
    console.log(results)
    res.json(results);
    await client.close();
  } catch (error) {
    console.error("Error executing query:", error.message);
    res.status(500).send("An error occurred while querying the database.");
  }
});

export default router;
