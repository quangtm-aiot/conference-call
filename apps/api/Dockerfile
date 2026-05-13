FROM node:20-alpine AS base
WORKDIR /app
RUN apk add --no-cache libc6-compat && corepack enable

FROM base AS pruner
COPY . .
RUN pnpm dlx turbo prune --scope=api --docker

FROM base AS deps
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install --frozen-lockfile

FROM deps AS builder
COPY --from=pruner /app/out/full/ .
RUN pnpm --filter api build
RUN pnpm --filter api deploy --prod /prod/api

FROM node:20-alpine AS runner
ENV NODE_ENV=production
WORKDIR /app
COPY --from=builder /prod/api ./
EXPOSE 4000
CMD ["node", "dist/src/main.js"]
