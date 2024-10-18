import React from 'react';
import '../styles/navbar.css';
import squirrel from '../assets/squirrel.png';

const Navbar = () => {
  return (

<nav className="navbar">
  <div className="navbar-left">
    <a href="/" className="logo">
      Aviary Ailment Appointments
    </a>
  </div>
  <div className="navbar-center">
    <ul className="nav-links">
      <li>
        <a href="/appointments">Schedule Appointments</a>
      </li>
      <li>
        <a href="/patient-owner-info">Patient & Owner Registration</a>
      </li>
      <li>
        <a href="/data">Data Analysis</a>
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