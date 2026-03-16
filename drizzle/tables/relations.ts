import { relations } from "drizzle-orm";
import { productsTable } from "@/drizzle/tables/products";
import { categoriesTable } from "@/drizzle/tables/categories";
import { usersTable } from "@/drizzle/tables/users";
import { sessionsTable } from "@/drizzle/tables/sessions";
import { accountsTable } from "@/drizzle/tables/accounts";
import {} from "@/drizzle/tables/verifications";

const productsRelations = relations(productsTable, ({ one }) => {
  return {
    category: one(categoriesTable, {
      fields: [productsTable.categoryId],
      references: [categoriesTable.id],
    }),
  };
});

const categoriesRelations = relations(categoriesTable, ({ many }) => {
  return {
    products: many(productsTable),
  };
});

const usersRelations = relations(usersTable, ({ many }) => ({
  sessions: many(sessionsTable),
  accounts: many(accountsTable),
}));

const sessionsRelations = relations(sessionsTable, ({ one }) => ({
  users: one(usersTable, {
    fields: [sessionsTable.userId],
    references: [usersTable.id],
  }),
}));

const accountsRelations = relations(accountsTable, ({ one }) => ({
  users: one(usersTable, {
    fields: [accountsTable.userId],
    references: [usersTable.id],
  }),
}));

export {
  productsRelations,
  categoriesRelations,
  usersRelations,
  sessionsRelations,
  accountsRelations,
};
