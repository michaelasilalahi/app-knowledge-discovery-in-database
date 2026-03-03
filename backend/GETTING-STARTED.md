# Getting Started

This service is a FastAPI backend.

## Prerequisites

- Python 3.10+ (3.12 is recommended)
- PostgreSQL running locally
- `pip`

## 1) Configure Database

The backend now reads database connection from environment variable:

- `DATABASE_URL`

If `DATABASE_URL` is not set, it falls back to this local default:

- `postgresql://postgres:michaelasilalahi@localhost:5432/postgres`

Example:

```bash
export DATABASE_URL="postgresql://postgres:password@localhost:5432/postgres"
```

## 2) Install Dependencies

From the `backend` folder:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

## 3) Run the Service

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

When the server starts, tables are auto-created by SQLAlchemy on startup.

## 4) Verify

Open:

- http://localhost:8000/docs

## 5) Run with Docker

Build image from `backend` folder:

```bash
docker build -t xpensa-api:local .
```

Run container:

```bash
docker run --rm -p 8000:8000 \
  -e DATABASE_URL="postgresql://postgres:password@host.docker.internal:5432/postgres" \
  xpensa-api:local
```

Then verify:

- http://localhost:8000/docs

## 6) GHCR Image via GitHub Actions

GitHub Actions publishes the backend image to:

- `ghcr.io/<github-owner>/xpensa/api`

Tags:

- `latest` on `main`
- `sha-<commit>` on each publish

The workflow can run automatically on push to `main` (backend changes) or manually via `workflow_dispatch`.

## 7) Deploy on Dokploy (Docker Compose)

Use compose file:

- `backend/docker-compose.yml`

Required variables in Dokploy:

- `GHCR_OWNER` (GitHub owner/org that owns the image package)
- `DATABASE_URL` (PostgreSQL connection string)

Optional variables:

- `API_IMAGE_TAG` (default: `latest`)
- `API_PORT` (default: `8000`)

If GHCR package visibility is private, add GHCR registry credentials in Dokploy:

- Registry: `ghcr.io`
- Username: GitHub username or bot account
- Password: GitHub PAT with `read:packages`

## 8) Health Check

Health endpoint:

- `GET /health`

Example response:

```json
{
  "status": "ok",
  "commit_hash": "sha-abc123..."
}
```

Notes:

- When deployed from GHCR `latest`, the backend still reports the real commit hash because CI bakes `github.sha` into the image as `GIT_COMMIT_HASH`.

## Optional: Seed Sample Data

After the API is running, you can seed sample expenditure data:

```bash
python tests/data_seeder.py
```
