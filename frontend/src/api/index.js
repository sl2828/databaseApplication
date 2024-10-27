import axios from 'axios';

const url = 'http://localhost:5050/patients';

export const fetchPatients = () => axios.get(url);