import './App.css';
import { Route, Routes } from "react-router-dom";
import Navbar from './components/navbar';
import Home from './pages/Home.js'
import Data from './pages/Data.js'
import PatientOwner from './pages/PatientOwner.js'
import Appointments from './pages/Appointments.js'

function App() {
    return (
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/patient-owner-info" element={<PatientOwner />} />
            <Route path="/data" element={<Data />} />
            <Route path="*" element={<Home />} /> {/* Default route */}
          </Routes>
        </div>
    );
}

export default App;
