// import '../styles/home.css';
import React, { useEffect } from 'react';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { getPatients } from '../actions/patients';

export default function PatientOwner() {
    const patients = useSelector((state) => state.patients);
    console.log(patients);

    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getPatients());
    }, [dispatch]);

    return (
        <header className="header">
        <h1> Patient Registration</h1>
        <p> This is going to be my database application project. </p>
        <h1> Owner Registration</h1>
        </header>
      );
}