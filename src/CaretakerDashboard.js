// src/CaretakerDashboard.js
import React, { useState } from 'react';
import api from './axiosInstance';

function CaretakerDashboard() {
  const [notes, setNotes] = useState('');
  const [patientId, setPatientId] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/patients/data', {
        patientId,
        notes,
      });
      setMessage('Patient data saved successfully.');
    } catch (error) {
      console.error('Error saving patient data', error);
      setMessage('Failed to save patient data.');
    }
  };

  return (
    <div>
      <h2>Welcome to the Caretaker Dashboard</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Patient ID"
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
          required
        />
        <textarea
          placeholder="Enter notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          required
        />
        <button type="submit">Save Patient Data</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default CaretakerDashboard;
