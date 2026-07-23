'use strict';

const request = require('supertest');
const app = require('../src/app');
const Patient = require('../src/models/patient');

beforeEach(() => Patient._reset());

describe('Patients API', () => {
  describe('GET /api/patients', () => {
    it('returns empty array when no patients', async () => {
      const res = await request(app).get('/api/patients');
      expect(res.status).toBe(200);
      expect(res.body).toEqual([]);
    });

    it('returns all patients', async () => {
      Patient.create({ firstName: 'Jane', lastName: 'Doe' });
      const res = await request(app).get('/api/patients');
      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(1);
    });
  });

  describe('GET /api/patients/:id', () => {
    it('returns patient by id', async () => {
      const p = Patient.create({ firstName: 'John', lastName: 'Smith' });
      const res = await request(app).get(`/api/patients/${p.id}`);
      expect(res.status).toBe(200);
      expect(res.body.id).toBe(p.id);
    });

    it('returns 404 for unknown id', async () => {
      const res = await request(app).get('/api/patients/nonexistent');
      expect(res.status).toBe(404);
    });
  });

  describe('POST /api/patients', () => {
    it('creates a patient', async () => {
      const res = await request(app).post('/api/patients').send({ firstName: 'Alice', lastName: 'Kim' });
      expect(res.status).toBe(201);
      expect(res.body.firstName).toBe('Alice');
      expect(res.body.id).toBeDefined();
    });

    it('returns 400 when firstName is missing', async () => {
      const res = await request(app).post('/api/patients').send({ lastName: 'Kim' });
      expect(res.status).toBe(400);
    });

    it('returns 400 when lastName is missing', async () => {
      const res = await request(app).post('/api/patients').send({ firstName: 'Alice' });
      expect(res.status).toBe(400);
    });
  });

  describe('PUT /api/patients/:id', () => {
    it('updates a patient', async () => {
      const p = Patient.create({ firstName: 'Bob', lastName: 'Lee' });
      const res = await request(app)
        .put(`/api/patients/${p.id}`)
        .send({ firstName: 'Robert', lastName: 'Lee' });
      expect(res.status).toBe(200);
      expect(res.body.firstName).toBe('Robert');
    });

    it('returns 404 for unknown id', async () => {
      const res = await request(app).put('/api/patients/nonexistent').send({ firstName: 'X', lastName: 'Y' });
      expect(res.status).toBe(404);
    });
  });

  describe('DELETE /api/patients/:id', () => {
    it('deletes a patient', async () => {
      const p = Patient.create({ firstName: 'Eve', lastName: 'Park' });
      const res = await request(app).delete(`/api/patients/${p.id}`);
      expect(res.status).toBe(204);
      expect(Patient.getById(p.id)).toBeNull();
    });

    it('returns 404 for unknown id', async () => {
      const res = await request(app).delete('/api/patients/nonexistent');
      expect(res.status).toBe(404);
    });
  });
});
