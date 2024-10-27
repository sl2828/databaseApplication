import express from "express";
import cors from "cors";
import owners from "./routes/owner.js";
import patients from "./routes/patient.js";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/owner", owners);
app.use("/patient", patients);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});