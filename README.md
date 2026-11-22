# CarbonTrack

CarbonTrack is a full-stack carbon management workspace for recording organizational activities, calculating estimated greenhouse gas emissions, monitoring trends, setting reduction targets, and exporting reports.

> **Factor notice:** built-in factors are illustrative estimates for software demonstration. They are not official or verified emissions factors. Confirm and document approved factor sources for your jurisdiction and reporting framework before using results externally.

## Features

- Organization creation, member/admin accounts, hashed passwords, and JWT sessions in HttpOnly cookies.
- Organization-scoped emission record create, read, update, and delete operations.
- Server-side calculations for electricity, fuel, transportation, and business travel. Stored records retain the factor value and factor version used.
- Dashboard metrics, monthly trend, category breakdown, recent activity, data-derived insights, and reduction progress.
- Annual reduction targets and CSV export.
- Responsive dark dashboard, validation, loading/error states, and calculator preview.

## Technology and structure

- Frontend: React, JavaScript, Vite, Recharts, Lucide React, regular CSS.
- Backend: Node.js, Express, Mongoose, MongoDB Atlas, bcryptjs, JWT.
- Hosting preparation: Vercel frontend configuration and Render backend start command.

```text
client/                 React/Vite application
  src/App.jsx            Screens, calculator, charts, and reusable UI components
  src/api.js             Credentialed API calls and CSV download
server/
  src/models/            User, Organization, Emission, Target
  src/routes/            Authentication and organization data APIs
  src/middleware/        Authentication and error handling
  src/utils/             Factors and server-side emission calculator
  test/                  Node built-in calculation tests
```

## Data model

- **Organization** owns users, emission records, and reduction targets.
- **User** stores a bcrypt password hash and organization membership (`admin` or `member`).
- **Emission** stores category, activity, consumption, date, calculated kg CO₂e, factor value/version, creator, organization, and optional demonstration marker.
- **Target** stores reporting year, baseline kg CO₂e, and reduction percentage, unique per organization/year.
- **EmissionFactor** stores versioned factor values and an explicit source note when seeded.

Every private read/write filters on the authenticated organization. Emission totals are calculated by the server and client submitted totals or organization IDs are ignored.

## API

All routes are under `/api`. Authentication endpoints are public where noted; remaining data endpoints require a valid session cookie.

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/health` | API and MongoDB connection status |
| POST | `/auth/register` | Create an organization and administrator |
| POST | `/auth/login` | Sign in |
| GET | `/auth/me` | Current account |
| POST | `/auth/logout` | Clear session |
| GET | `/factors` | Current illustrative factor configuration |
| POST | `/demo-data` | Explicitly add one set of labeled demonstration records |
| GET, POST | `/emissions` | List/create organization records |
| PUT, DELETE | `/emissions/:id` | Update/delete an organization record |
| GET | `/dashboard?year=YYYY` | KPI, monthly/category summaries, target progress, insights |
| GET | `/analytics` | Monthly category aggregates |
| GET, POST | `/targets` | List or upsert an annual target |
| GET | `/reports/csv` | Download organization records as CSV |

## Calculation method

The backend selects a factor from `server/src/utils/factors.js`, whose `FACTOR_VERSION` is stored with each record. Emissions are `consumption × factor`, in kg CO₂e. Units are paired with each factor (kWh, litres, cubic metres, or km). Update the backend configuration and version when adopting approved, sourced factors. Do not treat current demonstration factors as standards.

## Local development

Requirements: Node.js 20.19+ (or 22.12+) and npm, plus a MongoDB Atlas URI or local MongoDB instance.

1. Copy `server/.env.example` to `server/.env` and provide `MONGO_URI` and a long random `JWT_SECRET`.
2. Copy `client/.env.example` to `client/.env`. The default API URL is `http://localhost:5000/api`.
3. Install dependencies in each app directory: `cd server && npm install`, then `cd ../client && npm install`.
4. In separate terminals run `npm run dev` from `server` and `npm run dev` from `client`.
5. Open the Vite URL printed in the client terminal and register an organization.

Optionally run `npm run seed` from `server` to store the illustrative factor catalog in MongoDB for inspection. The active backend configuration is `server/src/utils/factors.js`; update it and increment `FACTOR_VERSION` together when changing factors.

Root shortcuts: `npm run dev:server`, `npm run dev:client`, `npm run build`, and `npm test` (the dependencies still need to be installed in `server` and `client`).

## Environment variables

Backend (`server/.env`): `PORT` (defaults to 5000), `MONGO_URI`, `JWT_SECRET`, `CLIENT_URL` (comma-separated allowed frontend origins), `NODE_ENV`.

Frontend (`client/.env`): `VITE_API_URL`, the public API base URL. Never put MongoDB credentials or JWT secrets in frontend variables.

## Tests

Run `npm test` at the repository root for Node's built-in calculator tests. Run `npm run build` to produce the frontend production bundle. Full registration, data isolation, CRUD, and aggregation workflows require a configured MongoDB database and should be exercised against a non-production database.

## Deployment

### Render API

Create a Node web service with repository root `server`, build command `npm install`, and start command `npm start`. Configure `MONGO_URI`, a strong `JWT_SECRET`, `CLIENT_URL` set to the Vercel origin, and `NODE_ENV=production`. Use a dedicated Atlas database user and appropriate network access.

### Vercel frontend

Import the repository, set root directory to `client`, build command `npm run build`, output directory `dist`, and `VITE_API_URL` to the Render API URL ending in `/api`. `client/vercel.json` supplies the SPA rewrite. Set the Render `CLIENT_URL` to the deployed frontend origin.

No deployment is claimed until the services are configured and verified.

## Screenshots

Add screenshots of the dashboard, calculator, and reports here after running the application with a configured database.

## Future enhancements

Source-managed factor records with audit history, configurable reporting frameworks, PDF report generation, invitations and member administration, and automated integration tests against ephemeral MongoDB.
