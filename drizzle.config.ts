import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import path from "node:path";

const config = defineConfig({
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
  schema: path.resolve("./drizzle/schemas.ts"),
  out: path.resolve("./drizzle/build/"),
  strict: true,
  verbose: true,
  casing: "camelCase",
});

export default config;
