import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { productsTable } from "@/drizzle/tables/products";
import { categoriesTable } from "@/drizzle/tables/categories";
import {
  categoriesRelations,
  productsRelations,
} from "@/drizzle/tables/relations";

const pg = new Pool({ connectionString: process.env.DATABASE_URL, max: 1 });
const db = drizzle(pg, {
  schema: {
    products: productsTable,
    categories: categoriesTable,
    productsRelations,
    categoriesRelations,
  },
});

export { db };
