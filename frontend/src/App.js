import './App.css';
import Navbar from './components/navbar';
import Home from './pages/Home.js'
import Data from './pages/Data.js'
import PatientOwner from './pages/PatientOwner.js'
import Appointments from './pages/Appointments.js'

function App() {
  let Component
  switch (window.location.pathname) {
    case "/home":
      Component = Home
      break
    case "/appointments":
      Component = Appointments
      break
    case "/patient-owner-info":
      Component = PatientOwner
      break
    default:  //case "/data":
      Component = Data
  }
  return (
    <div className="App">
      <Navbar />
      <Component />
    </div>
  );
}

export default App;
