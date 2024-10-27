import '../styles/home.css';
import '../styles/Lists.css';
import { useEffect, useState } from "react";

const Species = (props) => (
    <tr>
      <td> {props.species._id} </td>
      <td> {props.species.description} </td>
    </tr>
  );
  
const Vet = (props) => (
    <tr>
      <td> {props.vet._id} </td>    {/*license number*/}
      <td> {props.vet.name} </td>
      <td> {props.vet.yearsOfExperience} </td>
    </tr>
  );

export default function Home() {
    const [species, setSpecies] = useState([]);

    // This method fetches the records from the database.
    useEffect(() => {
      async function getSpecies() {
        const response = await fetch(`http://localhost:5050/species/`);
        if (!response.ok) {
          const message = `An error occurred with getting species: ${response.statusText}`;
          console.error(message);
          return;
        }
        const species = await response.json();
        setSpecies(species);
      }
      getSpecies();
      return;
    });
  
    // This method will map out the records on the table
    function speciesList() {
      return species.map((species) => {
        return (
          <Species
           species={species}
            key={species._id}
          />
        );
      });
    }
  
    const [vets, setVets] = useState([]);
  
    // This method fetches the records from the database.
    useEffect(() => {
      async function getVets() {
        const response = await fetch(`http://localhost:5050/vet/`);
        if (!response.ok) {
          const message = `An error occurred: ${response.statusText}`;
          console.error(message);
          return;
        }
        const vets = await response.json();
        setVets(vets);
      }
      getVets();
      return;
    });
  
    // This method will map out the records on the table
    function vetList() {
      return vets.map((vet) => {
        return (
          <Vet
            vet={vet}
            key={vet._id}
          />
        );
      });
    }
  


    return (
        <>
            <div className="header">
                <h1> Aviary Ailment Appointments </h1>
                <p> Give your pet bird the best care! </p>
            </div>
            <div className= "everything">
            <h3 className="text-lg">Our Veterinarians!</h3>
            <table className= "table">
                <thead>
                <tr>
                    <th>
                    Veterinary License Number
                    </th>
                    <th>
                    Name
                    </th>
                    <th>
                    Years of Experience
                    </th>
                </tr>
                </thead>
                <tbody>
                {vetList()}
                </tbody>
            </table>
            </div>

            <div style={{ height: "50px" }} />

            <div className= "everything">
                <h3 className="text-lg">Species We Care For</h3>
                <table className= "table">
                    <thead>
                    <tr>
                        <th>
                        Name
                        </th>
                        <th>
                        Description
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {speciesList()}
                    </tbody>
                </table>
                </div>
        </>
      );
}