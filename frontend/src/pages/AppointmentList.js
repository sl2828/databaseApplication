import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../styles/lists.css';

const Appointment = (props) => (
  <tr>
    <td> {props.appointment._id} </td>
    <td> {props.appointment.petName} </td>
    <td> {props.appointment.date} </td>
    <td> {props.appointment.time} </td>
    <td> {props.appointment.ownerSSN} </td>
    <td> {props.appointment.vetLicenseNumber} </td>
    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
      <div className="flex gap-2">
        <Link to={`/appointments/edit/${props.appointment._id}`}>
          Edit
        </Link>
        <button
          onClick={() => {
            props.deleteAppointment(props.appointment._id);
          }}
        >
          Delete
        </button>
      </div>
    </td>
  </tr>
);

export default function AppointmentList() {
  const [appointments, setAppointments] = useState([]);

  // This method fetches the records from the database.
  useEffect(() => {
    async function getAppointments() {
      const response = await fetch(`http://localhost:5050/appointment/`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const appointments = await response.json();
      setAppointments(appointments);
    }
    getAppointments();
    return;
  });

  // This method will delete a record
  async function deleteAppointment(id) {
    await fetch(`http://localhost:5050/appointment/${id}`, {
      method: "DELETE",
    });
    const newAppointments = appointments.filter((el) => el._id !== id);
    setAppointments(newAppointments);
  }

  // This method will map out the records on the table
  function appointmentList() {
    return appointments.map((appointment) => {
      return (
        <Appointment
          appointment={appointment}
          deleteAppointment={() => deleteAppointment(appointment._id)}
          key={appointment._id}
        />
      );
    });
  }

  // This following section will display the table with the records of individuals.
  return (
    <>
      <div className="everything">
        <h3 className="text-lg">Appointment List</h3>
        <table className="table">
          <thead>
            <tr>
              <th> Appointment ID </th>
              <th> PatientName </th>
              <th> Date </th>
              <th> Time </th>
              <th> Owner SSN </th>
              <th> Vet License Number </th>
              <th className="actions"> Actions </th>
            </tr>
          </thead>
          <tbody>
            {appointmentList()}
          </tbody>
        </table>
      </div>

      <div style={{ height: "50px" }} />

      <Link to={`/appointments/edit/`}>
        Add Appointment
      </Link>
    </>
  );
}