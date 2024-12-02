import './App.css';
import { Route, Routes } from "react-router-dom";
import Navbar from './components/navbar';
import Home from './pages/Home.js'
import Data from './pages/Data.js'
import PatientOwnerList from './pages/PatientOwnerList.js'
import AppointmentList from './pages/AppointmentList.js'
import Appointment from './pages/Appointment.js'

function App() {
    return (
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/appointments" element={<AppointmentList />} />
            <Route path="/patient-owner-info" element={<PatientOwnerList />} />
            <Route path="/data" element={<Data />} />
            <Route path="/appointments/edit/:id" element={<Appointment />} />
            <Route path="/appointments/edit/" element={<Appointment />} />
            <Route path="*" element={<Home />} /> {/* Default route */}
          </Routes>
        </div>
    );
}

export default App;
