import { relations } from "drizzle-orm";
import { productsTable } from "@/drizzle/tables/products";
import { categoriesTable } from "@/drizzle/tables/categories";

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

export { productsRelations, categoriesRelations };
