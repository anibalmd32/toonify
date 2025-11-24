import { config } from "dotenv";

const currentEnv = process.env.APP_ENV ?? "dev";
const dotEnvFiles = {
  dev: ".env.local",
  prod: ".env.production",
};

config({
  path: dotEnvFiles[currentEnv as keyof typeof dotEnvFiles],
});

const databaseConstants = {
  engine: process.env.DB_ENGINE ?? "postgres",
  host: process.env.DB_HOST ?? "localhost",
  port: process.env.DB_PORT ?? "5432",
  user: process.env.DB_USER ?? "postgres",
  password: process.env.DB_PASSWORD ?? "",
  database: process.env.DB_NAME ?? "",
};

const getDatabaseUrl = () => {
  return `${databaseConstants.engine}://${databaseConstants.user}:${databaseConstants.password}@${databaseConstants.host}:${databaseConstants.port}/${databaseConstants.database}`;
};

export const constants = {
  DATABASE_URL: getDatabaseUrl(),
  RESEND_API_KEY: process.env.RESEND_API_KEY ?? "",
  AUTH_URL: process.env.BETTER_AUTH_URL,
};
