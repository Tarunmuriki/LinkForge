# LinkForge — MERN Short-Link & Bio-Link Hub

A professional MERN starter implementing Project 04 of the assessment: short links, custom slugs, click telemetry, analytics, QR generation, and a customizable Link-in-Bio page.

## Stack
- React 19 + Vite
- Express + Node.js
- MongoDB + Mongoose
- JWT access/refresh cookies
- Tailwind CSS 4
- React Query
- Recharts
- Zod validation
- Express Rate Limit
- Helmet
- QRCode
- Lucide icons

## Requirements
Node.js 20+, MongoDB 7+.

## Setup
```bash
cp .env.example server/.env
npm install
npm run install:all
npm run dev
```
Open http://localhost:5173.

For demo data:
```bash
npm run seed
```

## API
Base URL: `http://localhost:5001/api/v1` (the starter uses `PORT=5001` to avoid macOS AirPlay occupying port 5000; change `server/.env` if needed)

Auth:
POST /auth/register
POST /auth/login
POST /auth/refresh
POST /auth/logout
GET  /auth/me
POST /auth/forgot-password
POST /auth/reset-password

Links:
POST /links
GET /links
GET /links/:id
PATCH /links/:id
DELETE /links/:id
POST /links/:id/qr
GET /links/:id/analytics

Analytics:
GET /analytics/overview
GET /analytics/clicks
GET /analytics/devices
GET /analytics/referrers

Bio:
GET /bio/me
PUT /bio/me
POST /bio/me/social-links
PATCH /bio/me/social-links/:id
DELETE /bio/me/social-links/:id
GET /bio/:username

Redirect:
GET /r/:shortCode

## Coss UI
The assessment requires Coss UI primitives. This starter keeps UI primitives local so it runs immediately. Before submission, initialize/replace the local primitives with the official Coss registry components:
`pnpm dlx shadcn@latest init @coss/style`
and add required components from `@coss/*`.
See COSS_SETUP.md.
