import express from "express";
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from "cors";

import patientRoutes from "./routes/patients.js";

const app = express();

app.use('/patients', patientRoutes);

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const CONNECTION_URL = 'mongodb+srv://linselin2828:yDPEYY8ntmQEEmtF@petcluster.mtzzu.mongodb.net/?retryWrites=true&w=majority&appName=petCluster';
const PORT = process.env.PORT || 5050;

mongoose.connect(CONNECTION_URL)
  .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
  .catch((error) => console.log(error.message));


// app.use(express.json());
// app.use("/", pets);

// // start the Express server
// app.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}`);
// });