import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { admin } from "better-auth/plugins/admin";
import { db } from "@/lib/db";
import { getBaseUrl } from "@/lib/utils";
import { accessControl, adminRole, userRole } from "@/lib/permissions";

const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    transaction: true,
    camelCase: true,
    usePlural: true,
  }),
  emailAndPassword: {
    enabled: true,
  },
  baseURL: process.env.BETTER_AUTH_URL,
  trustedOrigins: [getBaseUrl()],
  plugins: [
    admin({ ac: accessControl, roles: { user: userRole, admin: adminRole } }),
    nextCookies(),
  ],
});

export { auth };
