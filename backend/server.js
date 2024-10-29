import express from "express";
import cors from "cors";
import owners from "./routes/owner.js";
import patients from "./routes/patient.js";
import species from "./routes/species.js";
import vets from "./routes/vet.js";
import appointments from "./routes/appointment.js";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/owner", owners);
app.use("/patient", patients);
app.use("/species", species);
app.use("/vet", vets);
app.use("/appointment", appointments);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});