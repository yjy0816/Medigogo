'use strict';

const { v4: uuidv4 } = require('uuid');

// In-memory store
const patients = [];

/**
 * @typedef {Object} Patient
 * @property {string} id
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} dateOfBirth  – ISO date string (YYYY-MM-DD)
 * @property {string} gender       – 'male' | 'female' | 'other'
 * @property {string} phone
 * @property {string} email
 * @property {string} address
 * @property {string} bloodType
 * @property {string} notes
 * @property {string} createdAt
 * @property {string} updatedAt
 */

function getAll() {
  return [...patients];
}

function getById(id) {
  return patients.find((p) => p.id === id) || null;
}

function create(data) {
  const now = new Date().toISOString();
  const patient = {
    id: uuidv4(),
    firstName: data.firstName,
    lastName: data.lastName,
    dateOfBirth: data.dateOfBirth || null,
    gender: data.gender || 'other',
    phone: data.phone || '',
    email: data.email || '',
    address: data.address || '',
    bloodType: data.bloodType || '',
    notes: data.notes || '',
    createdAt: now,
    updatedAt: now,
  };
  patients.push(patient);
  return patient;
}

function update(id, data) {
  const idx = patients.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  const updated = { ...patients[idx], ...data, id, updatedAt: new Date().toISOString() };
  patients[idx] = updated;
  return updated;
}

function remove(id) {
  const idx = patients.findIndex((p) => p.id === id);
  if (idx === -1) return false;
  patients.splice(idx, 1);
  return true;
}

function _reset() {
  patients.length = 0;
}

module.exports = { getAll, getById, create, update, remove, _reset };
