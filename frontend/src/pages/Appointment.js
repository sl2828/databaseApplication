import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import '../styles/appointment.css';

export default function Appointment() {
  const [form, setForm] = useState({
    _id: "",
    petName: "",
    date: "",
    ownerSSN: "",
    time: "",
    vetLicenseNumber: "",
  });

  // eslint-disable-next-line
  const [isNew, setIsNew] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id?.toString() || undefined;
      if(!id) return;
      setIsNew(false);
      const response = await fetch(
        `http://localhost:5050/appointment/${params.id.toString()}`
      );
      if (!response.ok) {
        const message = `An error has occurred with appointments: ${response.statusText}`;
        console.error(message);
        return;
      }
      const appointment = await response.json();
      if (!appointment) {
        console.warn(`Appointment with id ${id} not found`);
        navigate("/appointments");
        return;
      }
      setForm(appointment);
    }
    fetchData();
    return;
  }, [params.id, navigate]);

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
async function onSubmit(e) {
    e.preventDefault();
    const person = { ...form };
    try {
      console.log("params.id: " + params.id);
      // if the id is present, we will set the URL to /record/:id, otherwise we will set the URL to /record.
      console.log(`http://localhost:5050/appointment${params.id ? "/"+params.id : ""}`);
      const response = await fetch(`http://localhost:5050/appointment${params.id ? "/"+params.id : ""}`, {
        // if the id is present, we will use the PATCH method, otherwise we will use the POST method.
        method: `${params.id ? "PATCH" : "POST"}`,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(person),
      });
  
      if (!response.ok) {
        const responseBody = await response.text();
        console.log("Response Body:", responseBody);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('A problem occurred with your fetch operation: ', error);
    } finally {
      setForm({ _id: "", petName: "", date: "", ownerSSN: "", time: "", vetLicenseNumber: "" });
      navigate("/appointments");
    }
  }

const [ownerSSN, setOwnerSSNs] = useState([]);

// This method fetches the records from the database.
useEffect(() => {
    async function getOwnerSSNs() {
    const response = await fetch(`http://localhost:5050/owner/`);
    if (!response.ok) {
        const message = `An error occurred with getting owners: ${response.statusText}`;
        console.error(message);
        return;
    }
    const data = await response.json();
    const ownerSSN = Array.from(new Set(data.map((doc) => doc._id)));
    setOwnerSSNs(ownerSSN);
    }
    getOwnerSSNs();
    return;
}, []);

const [petName, setPetNames] = useState([]);
useEffect(() => {
    async function getPetNames() {
    const response = await fetch(`http://localhost:5050/patient/`);
    if (!response.ok) {
        const message = `An error occurred with getting pets: ${response.statusText}`;
        console.error(message);
        return;
    }
    const data = await response.json();
    const petName = Array.from(new Set(data.map((doc) => doc._id.name)));
    setPetNames(petName);
    }
    getPetNames();
    return;
}, []);

const [vetLicenseNumber, setVetLicenseNumbers] = useState([]);
useEffect(() => {
    async function getVetLicenseNumbers() {
    const response = await fetch(`http://localhost:5050/vet/`);
    if (!response.ok) {
        const message = `An error occurred with getting vets: ${response.statusText}`;
        console.error(message);
        return;
    }
    const data = await response.json();
    const vetLicenseNumber = Array.from(new Set(data.map((doc) => doc._id)));
    setVetLicenseNumbers(vetLicenseNumber);
    }
    getVetLicenseNumbers();
    return;
}, []);

  // This following section will display the form that takes the input from the user.
    return (
     <div className="appointment-container">
        <h3 className="form-title">Create/Update Appointment</h3>
        <form onSubmit={onSubmit} className="form-container">
        <div className="form-section">
            <div>
            <h2 className="section-title">Appointment Info</h2>
            </div>
    
            <div className="form-grid">
            <div className="form-group">
                <label htmlFor="id" className="label">Appointment Id</label>
                <div className="input-wrapper">
                <input
                    type="text"
                    name="id"
                    id="id"
                    placeholder="***-****"
                    value={form._id}
                    onChange={(e) => updateForm({ _id: e.target.value })}
                    className="input-field"
                />
                </div>
            </div>
    
            <div className="form-group">
                <label htmlFor="date" className="label">Date</label>
                <div className="input-wrapper">
                <input
                    type="text"
                    name="date"
                    id="date"
                    placeholder="February 20, 2012"
                    value={form.date}
                    onChange={(e) => updateForm({ date: e.target.value })}
                    className="input-field"
                />
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="time" className="label">Time</label>
                <div className="input-wrapper">
                <input
                    type="text"
                    name="time"
                    id="time"
                    placeholder="10:30 AM"
                    value={form.time}
                    onChange={(e) => updateForm({ time: e.target.value })}
                    className="input-field"
                />
                </div>
            </div>
    
            <div>
                <fieldset className="options">
                <legend className="sr-only">Owner SSN</legend>
                <div className="options-container">
                    {ownerSSN.map((ownerSSN) => (
                    <label key={ownerSSN} className="radio-label">
                        <input
                        type="radio"
                        name="ownerSSNOptions"
                        value={ownerSSN}
                        checked={form.ownerSSN === ownerSSN}
                        onChange={(e) => updateForm({ ownerSSN: e.target.value })}
                        className="radio-input"
                        />
                        {ownerSSN}
                    </label>
                    ))}
                </div>
                </fieldset>
            </div>
            <div>
                <fieldset className="options">
                <legend className="sr-only">Patient Name</legend>
                <div className="options-container">
                    {petName.map((petName) => (
                    <label key={petName} className="radio-label">
                        <input
                        type="radio"
                        name="petNameOptions"
                        value={petName}
                        checked={form.petName === petName}
                        onChange={(e) => updateForm({ petName: e.target.value })}
                        className="radio-input"
                        />
                        {petName}
                    </label>
                    ))}
                </div>
                </fieldset>
            </div>
            <div>
                <fieldset className="options">
                <legend className="sr-only">Vet License Number</legend>
                <div className="options-container">
                    {vetLicenseNumber.map((vetLicenseNumber) => (
                    <label key={vetLicenseNumber} className="radio-label">
                        <input
                        type="radio"
                        name="vetLicenseNumberOptions"
                        value={vetLicenseNumber}
                        checked={form.vetLicenseNumber === vetLicenseNumber}
                        onChange={(e) => updateForm({ vetLicenseNumber: e.target.value })}
                        className="radio-input"
                        />
                        {vetLicenseNumber}
                    </label>
                    ))}
                </div>
                </fieldset>
            </div>

            </div>
        </div>
        <input
            type="submit"
            value="Submit"
            className="submit-button"
        />
        </form>
      </div>
    );
}