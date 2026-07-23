'use strict';

const express = require('express');
const router = express.Router();
const Appointment = require('../models/appointment');

// GET /api/appointments?patientId=&status=
router.get('/', (req, res) => {
  const { patientId, status } = req.query;
  let results = Appointment.getAll();
  if (patientId) results = results.filter((a) => a.patientId === patientId);
  if (status) results = results.filter((a) => a.status === status);
  res.json(results);
});

// GET /api/appointments/:id
router.get('/:id', (req, res) => {
  const appointment = Appointment.getById(req.params.id);
  if (!appointment) return res.status(404).json({ error: 'Appointment not found' });
  res.json(appointment);
});

// POST /api/appointments
router.post('/', (req, res) => {
  const { patientId, doctorName, appointmentDate } = req.body;
  if (!patientId) return res.status(400).json({ error: 'patientId is required' });
  if (!doctorName) return res.status(400).json({ error: 'doctorName is required' });
  if (!appointmentDate) return res.status(400).json({ error: 'appointmentDate is required' });
  const appointment = Appointment.create(req.body);
  res.status(201).json(appointment);
});

// PATCH /api/appointments/:id/status
router.patch('/:id/status', (req, res) => {
  const { status } = req.body;
  if (!status) return res.status(400).json({ error: 'status is required' });
  if (!Appointment.VALID_STATUSES.includes(status))
    return res.status(400).json({ error: `status must be one of: ${Appointment.VALID_STATUSES.join(', ')}` });
  const appointment = Appointment.updateStatus(req.params.id, status);
  if (!appointment) return res.status(404).json({ error: 'Appointment not found' });
  res.json(appointment);
});

// PUT /api/appointments/:id
router.put('/:id', (req, res) => {
  const appointment = Appointment.update(req.params.id, req.body);
  if (!appointment) return res.status(404).json({ error: 'Appointment not found' });
  res.json(appointment);
});

// DELETE /api/appointments/:id
router.delete('/:id', (req, res) => {
  const removed = Appointment.remove(req.params.id);
  if (!removed) return res.status(404).json({ error: 'Appointment not found' });
  res.status(204).send();
});

module.exports = router;
