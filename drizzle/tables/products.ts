import {
  integer,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { categoriesTable } from "@/drizzle/tables/categories";

type Product = typeof productsTable.$inferSelect;

const productsTable = pgTable("products", {
  id: uuid().primaryKey().defaultRandom(),
  categoryId: uuid()
    .references(() => categoriesTable.id, { onDelete: "cascade" })
    .notNull(),
  name: varchar().notNull(),
  slug: varchar().notNull(),
  description: varchar().notNull(),
  priceCents: integer().notNull(),
  image: varchar().notNull(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp()
    .defaultNow()
    .$onUpdateFn(() => new Date())
    .notNull(),
});

export type { Product };
export { productsTable };
