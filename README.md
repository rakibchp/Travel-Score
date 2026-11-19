# Explore Bangladesh 🇧🇩

Track the destinations you've visited across Bangladesh's 8 divisions and 64 districts.
**Every unique destination = 1 point.** Free and public.

- `frontend/` — React 19 + TypeScript + Vite + Tailwind CSS v4 + shadcn/ui conventions + TanStack Query + React Router
- `backend/` — Node + Express 5 + TypeScript + Mongoose (MongoDB Atlas), deployable as a Vercel serverless function
- `docs/ARCHITECTURE.md` — architecture, schema, API spec, auth flow, score logic, deployment strategy, roadmap

**Current status: Phase 1 (Foundation) complete.** See the checklist in `docs/ARCHITECTURE.md` §10.

---

## Prerequisites

- Node.js 20 or newer (22 LTS recommended)
- A MongoDB Atlas cluster (free M0 tier is fine) — or a local MongoDB for development

## 1. Set up MongoDB Atlas

1. Create a free cluster at https://cloud.mongodb.com.
2. **Database Access** → add a database user with a strong password (role: *Read and write to any database*, or scoped to `explore-bangladesh`).
3. **Network Access** → add your current IP for local development. For Vercel, add `0.0.0.0/0` (Vercel uses dynamic IPs) — keep the DB password strong.
4. **Connect → Drivers** → copy the `mongodb+srv://…` string and add the database name before the `?`, e.g.
   `mongodb+srv://user:pass@cluster0.xxxxx.mongodb.net/explore-bangladesh?retryWrites=true&w=majority`

## 2. Run the backend

```bash
cd backend
cp .env.example .env        # then paste your MONGODB_URI into .env
npm install
npm run db:check            # verifies the connection
npm run seed                # loads 8 divisions, 64 districts, 13 categories (safe to re-run)
npm run dev                 # http://localhost:5000/api/v1/health
```

Other scripts: `npm run typecheck`, `npm run build`, `npm start` (runs the compiled build).

## 3. Run the frontend

```bash
cd frontend
npm install
npm run dev                 # http://localhost:5173
```

The Vite dev server proxies `/api` to `http://localhost:5000`, so no CORS setup is needed locally.
If your backend runs elsewhere, copy `.env.example` to `.env.local` and change `DEV_API_PROXY_TARGET`.

## API (Phase 1)

| Method | Path | Description |
|---|---|---|
| GET | `/api/v1/health` | Liveness + database state |
| GET | `/api/v1/stats/overview` | Total destinations, districts, divisions, categories |
| GET | `/api/v1/divisions` | Divisions with district and destination counts |
| GET | `/api/v1/districts?division=sylhet` | Districts, optionally filtered by division slug |
| GET | `/api/v1/categories` | Active destination categories with counts |

Every response is `{ success: true, data }` or `{ success: false, error: { code, message, details? } }`.
The full planned API is in `docs/ARCHITECTURE.md` §4.

## Deploying to Vercel

Two Vercel projects from this one repository:

**Backend project**
1. New Project → import the repo → **Root Directory: `backend`**, Framework: *Other*.
2. Environment variables: `MONGODB_URI`, `NODE_ENV=production`, `CORS_ORIGINS=https://<your-frontend>.vercel.app`, `APP_URL=https://<your-frontend>.vercel.app`.
3. Deploy, then check `https://<backend>.vercel.app/api/v1/health`.
4. Run `npm run seed` once from your machine with `MONGODB_URI` pointing at the production database (indexes are not auto-built in production).

**Frontend project**
1. New Project → same repo → **Root Directory: `frontend`**, Framework: *Vite*.
2. Edit `frontend/vercel.json` and replace `YOUR-BACKEND-PROJECT.vercel.app` with your backend's domain. This makes `/api/*` on the frontend domain proxy to the backend, so the browser only ever talks to one origin.
3. No environment variables are needed (leave `VITE_API_BASE_URL` unset).

Use a separate `MONGODB_URI` (different database name) for Preview deployments so previews never touch production data.

## Security notes

- Secrets only live in `backend/.env` (git-ignored) and Vercel environment variables. Anything prefixed `VITE_` is shipped to browsers.
- The backend validates its environment at startup and refuses to start with missing/invalid config.
- Helmet security headers, CORS allow-list, 100 kb JSON limit and a general rate limiter are on from Phase 1. The rate limiter's memory store is per serverless instance; a shared store is planned for Phase 8.
