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

export default function OwnerList() {
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

  // This method will delete a record
  async function deleteOwner(id) {
    await fetch(`http://localhost:5050/owner/${id}`, {
      method: "DELETE",
    });
    const newOwners = owners.filter((el) => el._id !== id);
    setOwners(newOwners);
  }

  // This method will map out the records on the table
  function ownerList() {
    return owners.map((owner) => {
      return (
        <Owner
          owner={owner}
          deleteOwner={() => deleteOwner(owner._id)}
          key={owner._id}
        />
      );
    });
  }

  // This following section will display the table with the records of individuals.
  return (
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
  );
}