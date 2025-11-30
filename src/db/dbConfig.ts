import type { ClientConfig } from "pg";

const appEnv = process.env.NODE_ENV ?? "development";

const host = appEnv === "production" ? "postgres" : "localhost";

export const dbConfig: ClientConfig = {
  host,
  port: Number.parseInt(process.env.DB_PORT ?? "5432", 10),
  user: process.env.DB_USER ?? "postgres",
  password: process.env.DB_PASSWORD ?? "",
  database: process.env.DB_NAME ?? "",
};

export const dbUrl = `postgres://${dbConfig.user}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`;
