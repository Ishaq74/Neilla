# Project Guidelines

## Code Style
- **TypeScript** is used for both frontend (`src/`) and backend (`backend/src/`).
- **React** with functional components and hooks is standard in the frontend. See `src/components/` for examples.
- **Tailwind CSS** is used for styling. Utility classes are preferred; see `src/components/` for usage patterns.
- **shadcn-ui** components are used for UI consistency (`src/components/ui/`).
- **Backend** uses Express.js with modular route files (`backend/src/routes/`).
- **Formatting**: Follow Prettier/ESLint defaults. See `eslint.config.js`.

## Architecture
- **Monorepo**: Frontend in `src/`, backend in `backend/`.
- **Frontend**: React SPA, routes managed by React Router (`src/pages/`).
- **Backend**: Express API, routes in `backend/src/routes/`, Prisma ORM for DB (`backend/prisma/`).
- **API**: Served at `/api/*`. Frontend and backend are built and deployed together.
- **Static assets**: Served from `public/` and built `dist/`.

## Build and Test
- **Install**: `npm install` (root), then `cd backend && npm install`
- **Dev**: `npm run dev:full` (both), `npm run dev` (frontend), `npm run dev:backend` (backend)
- **Build**: `npm run build:production`
- **Start**: `npm start` (serves built frontend + backend)
- **Verify Render**: `./verify-render-fix.sh` or `./verify-render-deployment.sh`

## Project Conventions
- **Environment**: Use `.env.example` as template. Sensitive values must not be committed.
- **JWT Auth**: See `backend/src/middleware/auth.ts` and `backend/src/routes/auth.ts` for patterns.
- **Prisma**: DB schema in `backend/prisma/schema.prisma`. Migrations in `backend/prisma/migrations/`.
- **API Health**: `/api/health` endpoint for monitoring.
- **SPA Routing**: Backend serves `dist/index.html` for unknown routes.

## Integration Points
- **Database**: PostgreSQL via Prisma (`DATABASE_URL` in env).
- **External**: Render.com for deployment (`render.yaml`), Lovable.dev for quick deploy/testing.
- **Email/Auth**: JWT, bcrypt for password hashing.

## Security
- **Auth**: JWT-based, see `backend/src/middleware/auth.ts`.
- **Password**: Hashed with bcrypt.
- **CORS**: Configured for Render domains.
- **Secrets**: Never commit real secrets; use environment variables.

---

For more, see [README.md](../README.md) and code examples in referenced files/directories.