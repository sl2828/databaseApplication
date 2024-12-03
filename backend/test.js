import mongoose from 'mongoose';
import Appointment from './models/appointment.js';

mongoose.connect("mongodb+srv://linselin2828:yDPEYY8ntmQEEmtF@petcluster.mtzzu.mongodb.net/veterinary?retryWrites=true&w=majority&appName=petCluster")

// Create a new blog post object
const article = new Appointment({
  _id: '987-GHTS',
  petName: 'Selina',
  date: new Date("2025-02-25"),
  ownerSSN: "123-45-6789",
  time: "11:30 AM",
  vetLicenseNumber: "876-9084"
});

// Insert the article in our MongoDB database
article.save()
  .then((doc) => {
    console.log("Appointment saved:", doc);
    mongoose.connection.close(); // Close the connection after saving
  })
  .catch((error) => {
    console.error("Error saving appointment:", error);
    mongoose.connection.close();
  });







// import { MongoClient } from "mongodb";


// async function main(){
//     /**
//      * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
//      * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
//      */
//     const uri = "mongodb+srv://linselin2828:yDPEYY8ntmQEEmtF@petcluster.mtzzu.mongodb.net/?retryWrites=true&w=majority&appName=petCluster";
//     const client = new MongoClient(uri);
 
//     try {
//         // Connect to the MongoDB cluster
//         await client.connect();
 
//         const db = client.db("veterinary"); // Replace with your database name
//         const collection = db.collection("vet")
//         // Make the appropriate DB calls
//         await collection.rename("vets")
 
//     } catch (e) {
//         console.error(e);
//     } finally {
//         await client.close();
//     }
// }

// main().catch(console.error);