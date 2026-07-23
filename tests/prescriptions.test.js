'use strict';

const request = require('supertest');
const app = require('../src/app');
const Prescription = require('../src/models/prescription');

beforeEach(() => Prescription._reset());

const makeRx = (overrides = {}) =>
  Prescription.create({
    patientId: 'p-001',
    doctorName: 'Dr. Lee',
    medications: [{ name: 'Aspirin', dosage: '100mg', frequency: 'daily', durationDays: 30 }],
    ...overrides,
  });

describe('Prescriptions API', () => {
  describe('GET /api/prescriptions', () => {
    it('returns empty array initially', async () => {
      const res = await request(app).get('/api/prescriptions');
      expect(res.status).toBe(200);
      expect(res.body).toEqual([]);
    });

    it('filters by status', async () => {
      makeRx();
      Prescription.updateStatus(makeRx().id, 'dispensed');
      const res = await request(app).get('/api/prescriptions?status=dispensed');
      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(1);
    });
  });

  describe('GET /api/patients/:patientId/prescriptions (nested)', () => {
    it('returns prescriptions for a specific patient', async () => {
      makeRx({ patientId: 'p-001' });
      makeRx({ patientId: 'p-002' });
      const res = await request(app).get('/api/patients/p-001/prescriptions');
      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(1);
      expect(res.body[0].patientId).toBe('p-001');
    });

    it('returns empty array for patient with no prescriptions', async () => {
      const res = await request(app).get('/api/patients/nobody/prescriptions');
      expect(res.status).toBe(200);
      expect(res.body).toEqual([]);
    });
  });

  describe('GET /api/prescriptions/:id', () => {
    it('returns prescription by id', async () => {
      const p = makeRx();
      const res = await request(app).get(`/api/prescriptions/${p.id}`);
      expect(res.status).toBe(200);
      expect(res.body.id).toBe(p.id);
    });

    it('returns 404 for unknown id', async () => {
      const res = await request(app).get('/api/prescriptions/nonexistent');
      expect(res.status).toBe(404);
    });
  });

  describe('POST /api/prescriptions', () => {
    it('creates a prescription with status issued', async () => {
      const res = await request(app).post('/api/prescriptions').send({
        patientId: 'p-001',
        doctorName: 'Dr. Kim',
        medications: [{ name: 'Metformin', dosage: '500mg', frequency: 'twice daily', durationDays: 90 }],
      });
      expect(res.status).toBe(201);
      expect(res.body.status).toBe('issued');
      expect(res.body.id).toBeDefined();
    });

    it('returns 400 when patientId is missing', async () => {
      const res = await request(app)
        .post('/api/prescriptions')
        .send({ doctorName: 'Dr. Kim' });
      expect(res.status).toBe(400);
    });

    it('returns 400 when doctorName is missing', async () => {
      const res = await request(app)
        .post('/api/prescriptions')
        .send({ patientId: 'p-001' });
      expect(res.status).toBe(400);
    });
  });

  describe('PATCH /api/prescriptions/:id/status', () => {
    it('updates status to dispensed and records dispensedAt', async () => {
      const p = makeRx();
      const res = await request(app).patch(`/api/prescriptions/${p.id}/status`).send({ status: 'dispensed' });
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('dispensed');
      expect(res.body.dispensedAt).toBeDefined();
    });

    it('updates status to expired', async () => {
      const p = makeRx();
      const res = await request(app).patch(`/api/prescriptions/${p.id}/status`).send({ status: 'expired' });
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('expired');
    });

    it('updates status to cancelled', async () => {
      const p = makeRx();
      const res = await request(app).patch(`/api/prescriptions/${p.id}/status`).send({ status: 'cancelled' });
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('cancelled');
    });

    it('returns 400 for invalid status', async () => {
      const p = makeRx();
      const res = await request(app).patch(`/api/prescriptions/${p.id}/status`).send({ status: 'wrong' });
      expect(res.status).toBe(400);
    });

    it('returns 400 when status is missing', async () => {
      const p = makeRx();
      const res = await request(app).patch(`/api/prescriptions/${p.id}/status`).send({});
      expect(res.status).toBe(400);
    });

    it('returns 404 for unknown id', async () => {
      const res = await request(app).patch('/api/prescriptions/nonexistent/status').send({ status: 'dispensed' });
      expect(res.status).toBe(404);
    });
  });

  describe('PUT /api/prescriptions/:id', () => {
    it('updates prescription fields', async () => {
      const p = makeRx();
      const res = await request(app)
        .put(`/api/prescriptions/${p.id}`)
        .send({ notes: 'Take with food' });
      expect(res.status).toBe(200);
      expect(res.body.notes).toBe('Take with food');
    });

    it('returns 404 for unknown id', async () => {
      const res = await request(app).put('/api/prescriptions/nonexistent').send({ notes: 'x' });
      expect(res.status).toBe(404);
    });
  });

  describe('DELETE /api/prescriptions/:id', () => {
    it('deletes a prescription', async () => {
      const p = makeRx();
      const res = await request(app).delete(`/api/prescriptions/${p.id}`);
      expect(res.status).toBe(204);
      expect(Prescription.getById(p.id)).toBeNull();
    });

    it('returns 404 for unknown id', async () => {
      const res = await request(app).delete('/api/prescriptions/nonexistent');
      expect(res.status).toBe(404);
    });
  });
});
