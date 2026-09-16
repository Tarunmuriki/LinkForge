# Architecture

React/Vite frontend -> REST API -> Express services/controllers -> Mongoose -> MongoDB.

Authentication uses a 15-minute access JWT and 7-day refresh token in httpOnly cookies, with refresh-token rotation. Redirects use indexed shortCode lookups and asynchronous click-event recording. IPs are hashed before storage. Rate limits protect authentication, link creation, and redirect endpoints.
