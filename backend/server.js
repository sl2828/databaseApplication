import express from 'express';
import cors from "cors";
import connectDB from './db/connection.js';  // Import the DB connection
import appointments from './routes/appointment.js';  // Import routes
import owners from "./routes/owner.js";
import patients from "./routes/patient.js";
import species from "./routes/species.js";
import vets from "./routes/vet.js";

const PORT = process.env.PORT || 5050;
const app = express();

// Connect to MongoDB
connectDB();

app.use(cors());
app.use(express.json());
app.use("/owner", owners);
app.use("/patient", patients);
app.use("/species", species);
app.use("/vet", vets);
app.use('/appointment', appointments);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});