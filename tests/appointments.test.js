'use strict';

const request = require('supertest');
const app = require('../src/app');
const Appointment = require('../src/models/appointment');
const Patient = require('../src/models/patient');

beforeEach(() => {
  Appointment._reset();
  Patient._reset();
});

const makeAppt = (overrides = {}) =>
  Appointment.create({
    patientId: 'p-001',
    doctorName: 'Dr. Kim',
    appointmentDate: '2026-08-01T10:00:00Z',
    ...overrides,
  });

describe('Appointments API', () => {
  describe('GET /api/appointments', () => {
    it('returns empty array initially', async () => {
      const res = await request(app).get('/api/appointments');
      expect(res.status).toBe(200);
      expect(res.body).toEqual([]);
    });

    it('filters by status', async () => {
      makeAppt();
      Appointment.updateStatus(makeAppt().id, 'confirmed');
      const res = await request(app).get('/api/appointments?status=confirmed');
      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(1);
    });
  });

  describe('GET /api/patients/:patientId/appointments (nested)', () => {
    it('returns appointments for a specific patient', async () => {
      makeAppt({ patientId: 'p-001' });
      makeAppt({ patientId: 'p-002' });
      const res = await request(app).get('/api/patients/p-001/appointments');
      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(1);
      expect(res.body[0].patientId).toBe('p-001');
    });

    it('returns empty array for patient with no appointments', async () => {
      const res = await request(app).get('/api/patients/nobody/appointments');
      expect(res.status).toBe(200);
      expect(res.body).toEqual([]);
    });
  });

  describe('GET /api/appointments/:id', () => {
    it('returns appointment by id', async () => {
      const a = makeAppt();
      const res = await request(app).get(`/api/appointments/${a.id}`);
      expect(res.status).toBe(200);
      expect(res.body.id).toBe(a.id);
    });

    it('returns 404 for unknown id', async () => {
      const res = await request(app).get('/api/appointments/nonexistent');
      expect(res.status).toBe(404);
    });
  });

  describe('POST /api/appointments', () => {
    it('creates an appointment with status scheduled', async () => {
      const res = await request(app).post('/api/appointments').send({
        patientId: 'p-001',
        doctorName: 'Dr. Lee',
        appointmentDate: '2026-09-15T14:00:00Z',
      });
      expect(res.status).toBe(201);
      expect(res.body.status).toBe('scheduled');
      expect(res.body.id).toBeDefined();
    });

    it('returns 400 when patientId is missing', async () => {
      const res = await request(app)
        .post('/api/appointments')
        .send({ doctorName: 'Dr. Lee', appointmentDate: '2026-09-15T14:00:00Z' });
      expect(res.status).toBe(400);
    });

    it('returns 400 when doctorName is missing', async () => {
      const res = await request(app)
        .post('/api/appointments')
        .send({ patientId: 'p-001', appointmentDate: '2026-09-15T14:00:00Z' });
      expect(res.status).toBe(400);
    });

    it('returns 400 when appointmentDate is missing', async () => {
      const res = await request(app)
        .post('/api/appointments')
        .send({ patientId: 'p-001', doctorName: 'Dr. Lee' });
      expect(res.status).toBe(400);
    });
  });

  describe('PATCH /api/appointments/:id/status', () => {
    it('updates status to confirmed', async () => {
      const a = makeAppt();
      const res = await request(app).patch(`/api/appointments/${a.id}/status`).send({ status: 'confirmed' });
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('confirmed');
    });

    it('updates status to completed', async () => {
      const a = makeAppt();
      const res = await request(app).patch(`/api/appointments/${a.id}/status`).send({ status: 'completed' });
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('completed');
    });

    it('updates status to cancelled', async () => {
      const a = makeAppt();
      const res = await request(app).patch(`/api/appointments/${a.id}/status`).send({ status: 'cancelled' });
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('cancelled');
    });

    it('returns 400 for invalid status', async () => {
      const a = makeAppt();
      const res = await request(app).patch(`/api/appointments/${a.id}/status`).send({ status: 'flying' });
      expect(res.status).toBe(400);
    });

    it('returns 400 when status is missing', async () => {
      const a = makeAppt();
      const res = await request(app).patch(`/api/appointments/${a.id}/status`).send({});
      expect(res.status).toBe(400);
    });

    it('returns 404 for unknown id', async () => {
      const res = await request(app).patch('/api/appointments/nonexistent/status').send({ status: 'confirmed' });
      expect(res.status).toBe(404);
    });
  });

  describe('PUT /api/appointments/:id', () => {
    it('updates appointment fields', async () => {
      const a = makeAppt();
      const res = await request(app)
        .put(`/api/appointments/${a.id}`)
        .send({ doctorName: 'Dr. Park', department: 'Cardiology' });
      expect(res.status).toBe(200);
      expect(res.body.doctorName).toBe('Dr. Park');
      expect(res.body.department).toBe('Cardiology');
    });

    it('returns 404 for unknown id', async () => {
      const res = await request(app).put('/api/appointments/nonexistent').send({ doctorName: 'Dr. X' });
      expect(res.status).toBe(404);
    });
  });

  describe('DELETE /api/appointments/:id', () => {
    it('deletes an appointment', async () => {
      const a = makeAppt();
      const res = await request(app).delete(`/api/appointments/${a.id}`);
      expect(res.status).toBe(204);
      expect(Appointment.getById(a.id)).toBeNull();
    });

    it('returns 404 for unknown id', async () => {
      const res = await request(app).delete('/api/appointments/nonexistent');
      expect(res.status).toBe(404);
    });
  });
});
