'use strict';

const request = require('supertest');
const app = require('../src/app');
const Record = require('../src/models/record');

beforeEach(() => Record._reset());

const makeRecord = (overrides = {}) =>
  Record.create({
    patientId: 'p-001',
    diagnosis: 'Hypertension',
    treatment: 'Beta-blockers',
    ...overrides,
  });

describe('Medical Records API', () => {
  describe('GET /api/records', () => {
    it('returns empty array initially', async () => {
      const res = await request(app).get('/api/records');
      expect(res.status).toBe(200);
      expect(res.body).toEqual([]);
    });

    it('returns all records', async () => {
      makeRecord();
      makeRecord({ patientId: 'p-002' });
      const res = await request(app).get('/api/records');
      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(2);
    });

    it('filters by patientId', async () => {
      makeRecord({ patientId: 'p-001' });
      makeRecord({ patientId: 'p-002' });
      const res = await request(app).get('/api/records?patientId=p-001');
      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(1);
      expect(res.body[0].patientId).toBe('p-001');
    });
  });

  describe('GET /api/records/:id', () => {
    it('returns record by id', async () => {
      const r = makeRecord();
      const res = await request(app).get(`/api/records/${r.id}`);
      expect(res.status).toBe(200);
      expect(res.body.id).toBe(r.id);
    });

    it('returns 404 for unknown id', async () => {
      const res = await request(app).get('/api/records/nonexistent');
      expect(res.status).toBe(404);
    });
  });

  describe('POST /api/records', () => {
    it('creates a record', async () => {
      const res = await request(app).post('/api/records').send({
        patientId: 'p-001',
        diagnosis: 'Diabetes',
        treatment: 'Insulin therapy',
      });
      expect(res.status).toBe(201);
      expect(res.body.diagnosis).toBe('Diabetes');
      expect(res.body.id).toBeDefined();
    });

    it('returns 400 when patientId is missing', async () => {
      const res = await request(app)
        .post('/api/records')
        .send({ diagnosis: 'Flu', treatment: 'Rest' });
      expect(res.status).toBe(400);
    });
  });

  describe('PUT /api/records/:id', () => {
    it('updates a record', async () => {
      const r = makeRecord();
      const res = await request(app).put(`/api/records/${r.id}`).send({ diagnosis: 'Type 2 Diabetes' });
      expect(res.status).toBe(200);
      expect(res.body.diagnosis).toBe('Type 2 Diabetes');
    });

    it('returns 404 for unknown id', async () => {
      const res = await request(app).put('/api/records/nonexistent').send({ diagnosis: 'X' });
      expect(res.status).toBe(404);
    });
  });

  describe('DELETE /api/records/:id', () => {
    it('deletes a record', async () => {
      const r = makeRecord();
      const res = await request(app).delete(`/api/records/${r.id}`);
      expect(res.status).toBe(204);
      expect(Record.getById(r.id)).toBeNull();
    });

    it('returns 404 for unknown id', async () => {
      const res = await request(app).delete('/api/records/nonexistent');
      expect(res.status).toBe(404);
    });
  });
});
