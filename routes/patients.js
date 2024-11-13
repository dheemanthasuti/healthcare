// routes/patients.js
const express = require('express');
const PatientData = require('../models/PatientData');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/data', authMiddleware(['patient', 'caretaker']), async (req, res) => {
  const patientData = await PatientData.find({ patient: req.user.id });
  res.json(patientData);
});

router.post('/data', authMiddleware(['caretaker']), async (req, res) => {
  const { patientId, notes } = req.body;
  const patientData = new PatientData({ patient: patientId, caretaker: req.user.id, notes });
  await patientData.save();
  res.status(201).send('Patient data saved');
});

module.exports = router;
