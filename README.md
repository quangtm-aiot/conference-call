# Conference Call Monorepo

Monorepo MVP cho conference call da ngon ngu voi:

- `apps/web`: Next.js meeting UI
- `apps/api`: NestJS caption and room API
- `apps/docs`: docs app

## Local infrastructure

File [docker-compose.yml](/Users/aiot01/workspaces/conference/conference-call/docker-compose.yml) khoi tao 3 service cho local development:

- `postgres`: luu users, rooms, captions
- `redis`: room state, socket map, language preference
- `minio`: object storage cho transcript export

Tao env local:

```sh
cp .env.example .env
```

Khoi dong ha tang:

```sh
docker compose up -d
```

Dung ha tang:

```sh
docker compose down
```

Neu muon xoa ca volume:

```sh
docker compose down -v
```

## Default local endpoints

- Postgres: `localhost:5432`
- Redis: `localhost:6379`
- MinIO API: `localhost:9000`
- MinIO Console: `http://localhost:9001`

## Build apps

```sh
pnpm --filter api build
pnpm --filter web build
```
