import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { productsTable } from "@/drizzle/tables/products";
import { categoriesTable } from "@/drizzle/tables/categories";
import {
  accountsRelations,
  categoriesRelations,
  productsRelations,
  sessionsRelations,
  usersRelations,
} from "@/drizzle/tables/relations";
import { accountsTable } from "@/drizzle/tables/accounts";
import { sessionsTable } from "@/drizzle/tables/sessions";
import { usersTable } from "@/drizzle/tables/users";
import { verificationsTable } from "@/drizzle/tables/verifications";

const pg = new Pool({ connectionString: process.env.DATABASE_URL, max: 1 });
const db = drizzle(pg, {
  schema: {
    products: productsTable,
    categories: categoriesTable,
    accounts: accountsTable,
    sessions: sessionsTable,
    users: usersTable,
    verifications: verificationsTable,
    productsRelations,
    categoriesRelations,
    accountsRelations,
    sessionsRelations,
    usersRelations,
  },
});

export { db };
