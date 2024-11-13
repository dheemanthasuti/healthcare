// src/PatientDashboard.js
import React, { useEffect, useState } from 'react';
import api from './axiosInstance';

function PatientDashboard() {
  const [patientData, setPatientData] = useState(null);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await api.get('/patients/data');
        setPatientData(response.data);
      } catch (error) {
        console.error('Error fetching patient data', error);
      }
    };

    fetchPatientData();
  }, []);

  return (
    <div>
      <h2>Welcome to the Patient Dashboard</h2>
      {patientData ? (
        <pre>{JSON.stringify(patientData, null, 2)}</pre>
      ) : (
        <p>Loading patient data...</p>
      )}
    </div>
  );
}

export default PatientDashboard;
