'use strict';

const express = require('express');
const router = express.Router();
const Patient = require('../models/patient');

// GET /api/patients
router.get('/', (req, res) => {
  res.json(Patient.getAll());
});

// GET /api/patients/:id
router.get('/:id', (req, res) => {
  const patient = Patient.getById(req.params.id);
  if (!patient) return res.status(404).json({ error: 'Patient not found' });
  res.json(patient);
});

// POST /api/patients
router.post('/', (req, res) => {
  const { firstName, lastName } = req.body;
  if (!firstName) return res.status(400).json({ error: 'firstName is required' });
  if (!lastName) return res.status(400).json({ error: 'lastName is required' });
  const patient = Patient.create(req.body);
  res.status(201).json(patient);
});

// PUT /api/patients/:id
router.put('/:id', (req, res) => {
  const patient = Patient.update(req.params.id, req.body);
  if (!patient) return res.status(404).json({ error: 'Patient not found' });
  res.json(patient);
});

// DELETE /api/patients/:id
router.delete('/:id', (req, res) => {
  const removed = Patient.remove(req.params.id);
  if (!removed) return res.status(404).json({ error: 'Patient not found' });
  res.status(204).send();
});

module.exports = router;
