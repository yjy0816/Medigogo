'use strict';

const express = require('express');
const router = express.Router();
const Prescription = require('../models/prescription');

// GET /api/prescriptions?patientId=&status=
router.get('/', (req, res) => {
  const { patientId, status } = req.query;
  let results = Prescription.getAll();
  if (patientId) results = results.filter((p) => p.patientId === patientId);
  if (status) results = results.filter((p) => p.status === status);
  res.json(results);
});

// GET /api/prescriptions/:id
router.get('/:id', (req, res) => {
  const prescription = Prescription.getById(req.params.id);
  if (!prescription) return res.status(404).json({ error: 'Prescription not found' });
  res.json(prescription);
});

// POST /api/prescriptions
router.post('/', (req, res) => {
  const { patientId, doctorName } = req.body;
  if (!patientId) return res.status(400).json({ error: 'patientId is required' });
  if (!doctorName) return res.status(400).json({ error: 'doctorName is required' });
  const prescription = Prescription.create(req.body);
  res.status(201).json(prescription);
});

// PATCH /api/prescriptions/:id/status
router.patch('/:id/status', (req, res) => {
  const { status } = req.body;
  if (!status) return res.status(400).json({ error: 'status is required' });
  if (!Prescription.VALID_STATUSES.includes(status))
    return res
      .status(400)
      .json({ error: `status must be one of: ${Prescription.VALID_STATUSES.join(', ')}` });
  const prescription = Prescription.updateStatus(req.params.id, status);
  if (!prescription) return res.status(404).json({ error: 'Prescription not found' });
  res.json(prescription);
});

// PUT /api/prescriptions/:id
router.put('/:id', (req, res) => {
  const prescription = Prescription.update(req.params.id, req.body);
  if (!prescription) return res.status(404).json({ error: 'Prescription not found' });
  res.json(prescription);
});

// DELETE /api/prescriptions/:id
router.delete('/:id', (req, res) => {
  const removed = Prescription.remove(req.params.id);
  if (!removed) return res.status(404).json({ error: 'Prescription not found' });
  res.status(204).send();
});

module.exports = router;
