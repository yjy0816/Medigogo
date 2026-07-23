'use strict';

const { v4: uuidv4 } = require('uuid');

const records = [];

/**
 * @typedef {Object} MedicalRecord
 * @property {string} id
 * @property {string} patientId
 * @property {string} visitDate      – ISO datetime string
 * @property {string} doctorName
 * @property {string} diagnosis
 * @property {string} treatment
 * @property {string} notes
 * @property {string[]} attachments  – URLs or file references
 * @property {string} createdAt
 * @property {string} updatedAt
 */

function getAll() {
  return [...records];
}

function getById(id) {
  return records.find((r) => r.id === id) || null;
}

function create(data) {
  const now = new Date().toISOString();
  const record = {
    id: uuidv4(),
    patientId: data.patientId,
    visitDate: data.visitDate || now,
    doctorName: data.doctorName || '',
    diagnosis: data.diagnosis || '',
    treatment: data.treatment || '',
    notes: data.notes || '',
    attachments: data.attachments || [],
    createdAt: now,
    updatedAt: now,
  };
  records.push(record);
  return record;
}

function update(id, data) {
  const idx = records.findIndex((r) => r.id === id);
  if (idx === -1) return null;
  records[idx] = { ...records[idx], ...data, id, updatedAt: new Date().toISOString() };
  return records[idx];
}

function remove(id) {
  const idx = records.findIndex((r) => r.id === id);
  if (idx === -1) return false;
  records.splice(idx, 1);
  return true;
}

function getByPatient(patientId) {
  return records.filter((r) => r.patientId === patientId);
}

function _reset() {
  records.length = 0;
}

module.exports = { getAll, getById, create, update, remove, getByPatient, _reset };
