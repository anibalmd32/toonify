# ------------------------------------
# Stage 1: Build                     #
# ------------------------------------
FROM oven/bun:1.3.2 AS build

WORKDIR /app

COPY package.json bun.lock ./

RUN bun install --frozen-lockfile

COPY . .

RUN bun run build

# ------------------------------------
# Stage 3: Runtime                   #
# ------------------------------------
FROM oven/bun:1.3.2-slim AS app_runtime

WORKDIR /app

# COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.output ./.output

ENV NODE_ENV=production

EXPOSE 3000

CMD ["bun", "run", ".output/server/index.mjs"]
