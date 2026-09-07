# MERN Portfolio (Production-Ready Starter)

This repository is a production-oriented starter for a MERN (MongoDB, Express, React, Node) portfolio website.

Structure
- `server/` — Node/Express API, Mongoose models, PM2 example
- `client/` — React (Vite) frontend

Developer quick start
1. Copy env examples:
	 - `cp server/.env.example server/.env` (fill `MONGO_URI`)
	 - `cp client/.env.example client/.env` (optional)
2. Install dependencies:
	 - `cd server && npm install`
	 - `cd ../client && npm install`
3. Run in development:
	 - In one terminal: `cd server && npm run dev` (nodemon)
	 - In another: `cd client && npm run dev` (Vite)

Production build & serve (simple)
1. Build client: `cd client && npm run build`
2. Serve static files from server (server is configured to serve `client/dist` when NODE_ENV=production). Example:
	 - `cd server && NODE_ENV=production npm start`

Notes and next steps
- Add authentication (JWT) for a protected admin route to manage projects.
- Add CI/CD (GitHub Actions) to build images and push to container registry.
- Add tests (Jest for server, Vitest for client) and linting.

If you'd like, I can now:
- run a quick local smoke test of the server endpoints (if you want me to install dependencies here), or
- add an `admin` route and simple JWT auth to protect the project CRUD endpoints.

Hindi / short:
Yeh starter scaffold production-ready structure deta hai. Agar aap chahte hain main isko aur aage (auth, CI/CD, tests) configure karun to bataiye — main kar deta hoon.
