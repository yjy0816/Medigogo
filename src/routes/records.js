'use strict';

const express = require('express');
const router = express.Router();
const Record = require('../models/record');

// GET /api/records
router.get('/', (req, res) => {
  res.json(Record.getAll());
});

// GET /api/records/:id
router.get('/:id', (req, res) => {
  const record = Record.getById(req.params.id);
  if (!record) return res.status(404).json({ error: 'Record not found' });
  res.json(record);
});

// POST /api/records
router.post('/', (req, res) => {
  const { patientId } = req.body;
  if (!patientId) return res.status(400).json({ error: 'patientId is required' });
  const record = Record.create(req.body);
  res.status(201).json(record);
});

// PUT /api/records/:id
router.put('/:id', (req, res) => {
  const record = Record.update(req.params.id, req.body);
  if (!record) return res.status(404).json({ error: 'Record not found' });
  res.json(record);
});

// DELETE /api/records/:id
router.delete('/:id', (req, res) => {
  const removed = Record.remove(req.params.id);
  if (!removed) return res.status(404).json({ error: 'Record not found' });
  res.status(204).send();
});

module.exports = router;
