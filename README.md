# Solace Practice

Small full-stack app:

- `api/`: NestJS + TypeORM + PostgreSQL on http://localhost:3001
- `web/`: React 19 + Vite + Tailwind + TanStack Query + React Router v6 on http://localhost:3000
- `docker-compose.yml`: Postgres 16 only. The apps run on your machine.

Requires Node 22+ (`.nvmrc` pins 22) and Docker.

## First-time setup

Run these from the repo root:

```bash
# 1. Install dependencies (the root postinstall also installs api/ and web/)
npm install

# 2. Create the API env file. docker-compose reads its credentials from this file too.
cp api/.env.example api/.env

# 3. Start Postgres. This is the same as: docker compose --env-file api/.env up -d
npm run db:up

# 4. Apply the initial migration (creates the users table)
npm run migration:run --prefix api

# 5. Seed 5 sample users. It is safe to re-run because it upserts by email.
npm run seed --prefix api

# 6. Start the API and the web app together
npm run dev
```

Then open http://localhost:3000/patients.

Postgres is exposed on host port **5434** (`DB_PORT` in `api/.env`), so it doesn't clash with other local Postgres instances on 5432 and 5433. To change the port, edit `api/.env`. Both the API and docker-compose read it from there.

## Root scripts

| Script           | What it does                          |
| ---------------- | ------------------------------------- |
| `npm run dev`    | API and web together (concurrently)   |
| `npm run api`    | API only (`nest start --watch`)       |
| `npm run web`    | Web only (Vite dev server)            |
| `npm run db:up`  | Start Postgres                        |
| `npm run db:down`| Stop Postgres (data stays in the `pgdata` volume) |

## Migrations

`synchronize` is `false` everywhere, so all schema changes go through migrations. Run these from `api/`:

```bash
# After changing an entity, generate a migration from the diff:
npm run migration:generate -- src/migrations/AddPhoneToUsers

npm run migration:run      # apply pending migrations
npm run migration:revert   # undo the last migration
```

All three commands use the TypeORM CLI with ts-node and `src/datasource.ts`.

## How `/api` maps to the API

The API has **no global prefix**, so its routes are `/users`, `/users/:id` and so on. The Vite dev server proxies `/api/*` to `http://localhost:3001` and **strips the `/api` prefix**. For example, `GET /api/users` in the browser becomes `GET http://localhost:3001/users`.

## API endpoints

| Method | Path         | Body                     |
| ------ | ------------ | ------------------------ |
| POST   | `/users`     | `{ name, email }`        |
| GET    | `/users`     |                          |
| GET    | `/users/:id` |                          |
| PATCH  | `/users/:id` | `{ name?, email? }`      |
| DELETE | `/users/:id` | (returns 204)            |

Invalid bodies return 400 from the global ValidationPipe. Unknown fields are rejected. A duplicate email returns 409.

In the UI these records are labelled **patients**, but the web app calls the same `/users` endpoints.
