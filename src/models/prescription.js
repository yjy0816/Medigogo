'use strict';

const { v4: uuidv4 } = require('uuid');

const prescriptions = [];

const VALID_STATUSES = ['issued', 'dispensed', 'expired', 'cancelled'];

/**
 * @typedef {Object} Prescription
 * @property {string} id
 * @property {string} patientId
 * @property {string} doctorName
 * @property {string} issuedDate   – ISO datetime string
 * @property {string} expiryDate   – ISO date string
 * @property {string} status
 * @property {PrescriptionItem[]} medications
 * @property {string} notes
 * @property {string} createdAt
 * @property {string} updatedAt
 */

/**
 * @typedef {Object} PrescriptionItem
 * @property {string} name
 * @property {string} dosage
 * @property {string} frequency
 * @property {number} durationDays
 */

function getAll() {
  return [...prescriptions];
}

function getById(id) {
  return prescriptions.find((p) => p.id === id) || null;
}

function create(data) {
  const now = new Date().toISOString();
  const prescription = {
    id: uuidv4(),
    patientId: data.patientId,
    doctorName: data.doctorName,
    issuedDate: data.issuedDate || now,
    expiryDate: data.expiryDate || null,
    status: 'issued',
    medications: data.medications || [],
    notes: data.notes || '',
    createdAt: now,
    updatedAt: now,
  };
  prescriptions.push(prescription);
  return prescription;
}

function updateStatus(id, status) {
  if (!VALID_STATUSES.includes(status)) return null;
  const idx = prescriptions.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  const dispensedAt = status === 'dispensed' ? new Date().toISOString() : prescriptions[idx].dispensedAt || null;
  prescriptions[idx] = {
    ...prescriptions[idx],
    status,
    dispensedAt,
    updatedAt: new Date().toISOString(),
  };
  return prescriptions[idx];
}

function update(id, data) {
  const idx = prescriptions.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  prescriptions[idx] = { ...prescriptions[idx], ...data, id, updatedAt: new Date().toISOString() };
  return prescriptions[idx];
}

function remove(id) {
  const idx = prescriptions.findIndex((p) => p.id === id);
  if (idx === -1) return false;
  prescriptions.splice(idx, 1);
  return true;
}

function getByPatient(patientId) {
  return prescriptions.filter((p) => p.patientId === patientId);
}

function getByStatus(status) {
  return prescriptions.filter((p) => p.status === status);
}

function _reset() {
  prescriptions.length = 0;
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  updateStatus,
  remove,
  getByPatient,
  getByStatus,
  VALID_STATUSES,
  _reset,
};
