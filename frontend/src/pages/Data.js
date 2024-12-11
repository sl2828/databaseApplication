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
  const [error, setError] = useState("");

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
    setError(""); // Clear any existing errors
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
      setError("Failed to query appointments.");
    }
  }

  //This following section will display the form that takes the input from the user.
  return (
    <div>
      <h3 className="form-title">Create/Update Appointment</h3>
      {error && <p className="error-message">{error}</p>}
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
                <option value="" disabled>
                  Select a species
                </option>
                {species.map((choice) => (
                  <option key={choice} value={choice}>
                    {choice}
                  </option>
                ))}
              </select>
            </div>



            <div className="date-range-container">
              <label htmlFor="startDate" className="date-label">Start Date</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                className="date-input"
                value={form.startDate} // Bind to form state
                onChange={(e) => updateForm({ startDate: e.target.value })} // Update form state
              />

              <span className="separator">to</span>

              <label htmlFor="endDate" className="date-label">End Date</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                className="date-input"
                value={form.endDate} // Bind to form state
                onChange={(e) => updateForm({ endDate: e.target.value })} // Update form state
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
                <th>Average Weight</th>
                <th>Average Years of Experience</th>
              </tr>
            </thead>
            <tbody>
              {queryResults.map((result) => (
                <tr key={result._id}>
                  <td>{result.averageWeight}</td>
                  <td>{result.averageYearsOfExperience}</td>
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
