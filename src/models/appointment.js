'use strict';

const { v4: uuidv4 } = require('uuid');

const appointments = [];

const VALID_STATUSES = ['scheduled', 'confirmed', 'completed', 'cancelled', 'no_show'];

/**
 * @typedef {Object} Appointment
 * @property {string} id
 * @property {string} patientId
 * @property {string} doctorName
 * @property {string} department
 * @property {string} appointmentDate  – ISO datetime string
 * @property {string} status
 * @property {string} reason
 * @property {string} notes
 * @property {string} createdAt
 * @property {string} updatedAt
 */

function getAll() {
  return [...appointments];
}

function getById(id) {
  return appointments.find((a) => a.id === id) || null;
}

function create(data) {
  const now = new Date().toISOString();
  const appointment = {
    id: uuidv4(),
    patientId: data.patientId,
    doctorName: data.doctorName,
    department: data.department || 'General',
    appointmentDate: data.appointmentDate,
    status: 'scheduled',
    reason: data.reason || '',
    notes: data.notes || '',
    createdAt: now,
    updatedAt: now,
  };
  appointments.push(appointment);
  return appointment;
}

function updateStatus(id, status) {
  if (!VALID_STATUSES.includes(status)) return null;
  const idx = appointments.findIndex((a) => a.id === id);
  if (idx === -1) return null;
  appointments[idx] = { ...appointments[idx], status, updatedAt: new Date().toISOString() };
  return appointments[idx];
}

function update(id, data) {
  const idx = appointments.findIndex((a) => a.id === id);
  if (idx === -1) return null;
  appointments[idx] = { ...appointments[idx], ...data, id, updatedAt: new Date().toISOString() };
  return appointments[idx];
}

function remove(id) {
  const idx = appointments.findIndex((a) => a.id === id);
  if (idx === -1) return false;
  appointments.splice(idx, 1);
  return true;
}

function getByPatient(patientId) {
  return appointments.filter((a) => a.patientId === patientId);
}

function getByStatus(status) {
  return appointments.filter((a) => a.status === status);
}

function _reset() {
  appointments.length = 0;
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
