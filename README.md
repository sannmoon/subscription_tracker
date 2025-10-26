# Subscription Tracker

Lightweight Next.js app for keeping tabs on recurring subscriptions. Add, edit, or delete plans, and the dashboard surfaces how many days are left until the next charge.

## Features
- Server actions backed by Prisma keep subscription records in SQLite.
- Add/edit forms validate required fields before persisting changes.
- Cards summarize price, billing cadence, next payment date, and countdown.
- Tailwind-driven UI with date-fns calculating renewal dates.

## Quick Start
1. Install dependencies: `npm install`.
2. Configure `DATABASE_URL` in `.env` (example: `file:./prisma/dev.db`).
3. Apply migrations: `npm run migrate`.
4. Run the dev server: `npm run dev` and open `http://localhost:3000`.

Useful scripts:
- `npm run migration:create` – scaffold a new Prisma migration.
- `npm run build` / `npm start` – production build and start-up.
