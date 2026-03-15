import "dotenv/config";
import { defineConfig } from "drizzle-kit";

const config = defineConfig({
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
  schema: "./drizzle/schemas.ts",
  out: "./drizzle/build/",
  strict: true,
  verbose: true,
  casing: "camelCase",
});

export default config;
