import React from 'react';
import '../styles/navbar.css';
import squirrel from '../assets/squirrel.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
  <nav className="navbar">
    <div className="navbar-left">
      <li>
        <Link to="/home" className="logo">
          Aviary Ailment Appointments
        </Link>
      </li>
    </div>
    <div className="navbar-center">
      <ul className="nav-links">
        <li>
          <Link to="/appointments">Schedule Appointments</Link>
        </li>
        <li>
          <Link to="/patient-owner-info">Patient & Owner Registration</Link>
        </li>
        <li>
          <Link to="/data">Data Analysis</Link>
        </li>
      </ul>
    </div>
    <div className="navbar-right">
      <img src={squirrel} className="Squirrel-picture" alt="squirrel" />
    </div>
  </nav>
  );
};

export default Navbar;