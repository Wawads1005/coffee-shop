import {
  AnyPgColumn,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

type Category = typeof categoriesTable.$inferSelect;

const categoriesTable = pgTable("categories", {
  id: uuid().primaryKey().defaultRandom(),
  parentId: uuid().references((): AnyPgColumn => categoriesTable.id, {
    onDelete: "cascade",
  }),
  description: varchar().notNull(),
  name: varchar().notNull(),
  slug: varchar().notNull(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp()
    .defaultNow()
    .$onUpdateFn(() => new Date())
    .notNull(),
});

export type { Category };
export { categoriesTable };
