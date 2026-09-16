# LinkForge API

Base: `/api/v1`

## Authentication
- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/refresh`
- `POST /auth/logout`
- `GET /auth/me`
- `POST /auth/forgot-password`
- `POST /auth/reset-password`

## Links
- `POST /links`
- `GET /links?q=&page=&limit=`
- `GET /links/:id`
- `PATCH /links/:id`
- `DELETE /links/:id`
- `POST /links/:id/qr`
- `GET /links/:id/analytics`

## Analytics
- `GET /analytics/overview`
- `GET /analytics/clicks`
- `GET /analytics/devices`
- `GET /analytics/referrers`

## Bio
- `GET /bio/me`
- `PUT /bio/me`
- `POST /bio/me/social-links`
- `PATCH /bio/me/social-links/:id`
- `DELETE /bio/me/social-links/:id`
- `GET /bio/:username`

## Redirect
- `GET /r/:shortCode` — 302 redirect with asynchronous click telemetry.
