import { useEffect, useState } from "react";
import '../styles/Lists.css';

const Owner = (props) => (
  <tr>
    <td> {props.owner._id} </td>
    <td> {props.owner.name} </td>
    <td> {props.owner.email} </td>
    <td> {props.owner.phoneNumber} </td>
  </tr>
);

const Patient = (props) => (
  <tr>
    <td> {props.patient._id.name} </td>
    <td> {props.patient._id.ownerSSN} </td>
    <td> {props.patient.speciesName} </td>
    <td> {props.patient.age} </td>
    <td> {props.patient.weight} </td>
  </tr>
);


export default function PatientOwnerList() {
  const [patients, setPatients] = useState([]);

  // This method fetches the records from the database.
  useEffect(() => {
    async function getPatients() {
      const response = await fetch(`http://localhost:5050/patient/`);
      if (!response.ok) {
        const message = `An error occurred with getting patients: ${response.statusText}`;
        console.error(message);
        return;
      }
      const patients = await response.json();
      setPatients(patients);
    }
    getPatients();
    return;
  });

  // This method will map out the records on the table
  function patientList() {
    return patients.map((patient) => {
      return (
        <Patient
          patient={patient}
          key={`${patient._id.name}-${patient._id.ownerSSN}`}
        />
      );
    });
  }

  const [owners, setOwners] = useState([]);

  // This method fetches the records from the database.
  useEffect(() => {
    async function getOwners() {
      const response = await fetch(`http://localhost:5050/owner/`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const owners = await response.json();
      setOwners(owners);
    }
    getOwners();
    return;
  });

  // This method will map out the records on the table
  function ownerList() {
    return owners.map((owner) => {
      return (
        <Owner
          owner={owner}
          key={owner._id}
        />
      );
    });
  }

  // This following section will display the table with the records of individuals.
  return (
    <>
      <div className= "everything">
        <h3 className="text-lg">List of Patients</h3>
          <table className= "table">
            <thead>
              <tr>
                <th>
                  Name
                </th>
                <th>
                  Owner SSN
                </th>
                <th>
                  Species Name
                </th>
                <th>
                  Age
                </th>
                <th>
                  Weight
                </th>
              </tr>
            </thead>
            <tbody>
              {patientList()}
            </tbody>
          </table>
        </div>

      <div style={{ height: "50px" }} />

      <div className= "everything">
        <h3 className="text-lg">List of Owners</h3>
          <table className= "table">
            <thead>
              <tr>
                <th>
                  SSN
                </th>
                <th>
                  Name
                </th>
                <th>
                  Email
                </th>
                <th>
                  Phone Number
                </th>
              </tr>
            </thead>
            <tbody>
              {ownerList()}
            </tbody>
          </table>
        </div>
      </>
  );
}