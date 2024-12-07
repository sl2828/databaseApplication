import React, { useState, useEffect } from "react";
import "../styles/data.css";

export default function Data() {
  const [form, setForm] = useState({
    species: "",
    startDate: "",
    endDate: "",
  });

  const [species, setSpecies] = useState([]);
  const [queryResults, setQueryResults] = useState([]);

  // Update form state
  function updateForm(value) {
    setForm((prev) => ({ ...prev, ...value }));
  }

  // Fetch species data for the dropdown
  useEffect(() => {
    async function getSpecies() {
      try {
        const response = await fetch("http://localhost:5050/species/");
        if (!response.ok) {
          throw new Error(`Error fetching species: ${response.statusText}`);
        }
        const data = await response.json();
        const uniqueSpecies = Array.from(new Set(data.map((doc) => doc._id)));
        setSpecies(uniqueSpecies);
      } catch (error) {
        console.error(error.message);
      }
    }
    getSpecies();
  }, []);

  // Handle form submission
  async function onSubmit(e) {
    e.preventDefault();
    try {
      const truncatedStartDate = form.startDate?.slice(0, 10) || null;
      const truncatedEndDate = form.endDate?.slice(0, 10) || null;

      // Construct the query object
      const query = {
        species: form.species,
        startDate: truncatedStartDate,
        endDate: truncatedEndDate,
      };

      const response = await fetch("http://localhost:5050/queryAppointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(query),
      });

      if (!response.ok) {
        throw new Error(`Query failed: ${response.statusText}`);
      }

      const results = await response.json();
      setQueryResults(results);
    } catch (error) {
      console.error("Error querying appointments:", error.message);
    }
  }

  //This following section will display the form that takes the input from the user.
  return (
    <div>
      <h3 className="form-title">Create/Update Appointment</h3>
      <form onSubmit={onSubmit} className="form-container">
      <div className="form-section">
          <div>
          <h2 className="section-title">Appointment Info</h2>
          </div>
  
          <div className="form-grid">
  
          <div>
              <legend className="sr-only"> Species </legend>
              <select
                  id="speciesDropdown"
                  name="speciesOptions"
                  value={form.species}
                  onChange={(e) => updateForm({ species: e.target.value })}
                  className="dropdown-menu"
              >
                  {species.map((choice) => (
                      <option key={choice} value={choice}>
                          {choice}
                      </option>
                  ))}
              </select>
          </div>

          <div class="date-range-container">
            <label htmlFor="startDate" class="date-label">Start Date</label>
            <input
                type="date"
                id="startDate"
                name="startDate"
                class="date-input"
            />

            <span class="separator">to</span>

            <label htmlFor="endDate" class="date-label">End Date</label>
            <input
                type="date"
                id="endDate"
                name="endDate"
                class="date-input"
            />
          </div>

          </div>
      </div>
      <input
          type="submit"
          value="Submit"
          className="submit-button"
      />
      </form>

      <div className="results-section">
        <h3>Query Results</h3>
        {queryResults.length > 0 ? (
          <table className="results-table">
            <thead>
              <tr>
                <th>Pet Name</th>
                <th>Date</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {queryResults.map((result) => (
                <tr key={result._id}>
                  <td>{result.petName}</td>
                  <td>{result.date}</td>
                  <td>{result.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No results found.</p>
        )}
      </div>

    </div>
  );
}
