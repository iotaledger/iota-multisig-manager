# IOTA Multisig Manager

IOTA Multisig Manager is a full-stack application for managing IOTA blockchain multisig wallets, built with a Bun/TypeScript API backend and React frontend.

## Architecture

- **Backend API** (`/api`): Bun + Hono + PostgreSQL + Drizzle ORM
- **Frontend** (`/app`): React + Vite + TypeScript + Tailwind CSS
- **Database**: PostgreSQL with Drizzle ORM migrations
- **Blockchain**: IOTA Network integration via @iota/iota-sdk

## Starting to work locally

First create a `.env` file `/api/.env` based on the `.env.example` file.

```sh
cp api/.env.test api/.env

```

Start postgres locally using Docker:

```sh
docker compose up postgres -d
```

Install dependencies:

```sh
bun install
```

The first time run the migrations to create the database schema:

```sh
(cd api && bun run db:migrate)
```

Then build the SDK and spin up the frontend and API:

```sh
bun run dev
```

They are all in "watch" mode, so all changes would reflect as you are
developing.
