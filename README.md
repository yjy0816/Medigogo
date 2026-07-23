# Medigogo

Medigogo is a patient-centric healthcare platform providing REST API and SPA frontend for managing patients, appointments, medical records, and prescriptions.

## Features

- **Patients** – CRUD for patient demographics (name, DOB, gender, phone, blood type, email, address)
- **Appointments** – CRUD + `PATCH /:id/status` lifecycle (`scheduled → confirmed → completed / cancelled / no_show`); filterable by `?patientId=` and `?status=`
- **Medical Records** – CRUD for visit history (diagnosis, treatment, notes); filterable by `?patientId=`
- **Prescriptions** – CRUD + `PATCH /:id/status` lifecycle (`issued → dispensed / expired / cancelled`); records `dispensedAt` timestamp on dispense; filterable by `?patientId=` and `?status=`

## Security

Global rate limiter (`express-rate-limit`, 200 req/min/IP) applied before all routes.

## Frontend

Static SPA (`public/`) with four tabs — Patients, Appointments, Medical Records, Prescriptions — modal forms for create/edit/status updates, and XSS-safe HTML escaping throughout.

## Getting Started

```bash
npm install
npm start          # production server on port 3000
npm run dev        # auto-restart on file change
```

## API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/patients` | List all patients |
| POST | `/api/patients` | Create patient (`firstName`, `lastName` required) |
| GET | `/api/patients/:id` | Get patient |
| PUT | `/api/patients/:id` | Update patient |
| DELETE | `/api/patients/:id` | Delete patient |
| GET | `/api/appointments[?patientId=&status=]` | List appointments |
| POST | `/api/appointments` | Create appointment (`patientId`, `doctorName`, `appointmentDate` required) |
| GET | `/api/appointments/:id` | Get appointment |
| PUT | `/api/appointments/:id` | Update appointment |
| PATCH | `/api/appointments/:id/status` | Update appointment status |
| DELETE | `/api/appointments/:id` | Delete appointment |
| GET | `/api/records[?patientId=]` | List medical records |
| POST | `/api/records` | Create record (`patientId` required) |
| GET | `/api/records/:id` | Get record |
| PUT | `/api/records/:id` | Update record |
| DELETE | `/api/records/:id` | Delete record |
| GET | `/api/prescriptions[?patientId=&status=]` | List prescriptions |
| POST | `/api/prescriptions` | Create prescription (`patientId`, `doctorName` required) |
| GET | `/api/prescriptions/:id` | Get prescription |
| PUT | `/api/prescriptions/:id` | Update prescription |
| PATCH | `/api/prescriptions/:id/status` | Update prescription status |
| DELETE | `/api/prescriptions/:id` | Delete prescription |
| GET | `/api/health` | Health check |

## Tests

```bash
npm test
```

59 Jest + Supertest tests covering CRUD, status transitions, `400` validation, and `404` not-found paths across all four modules.
