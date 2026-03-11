"use server";

import { categoriesTable, productsTable } from "@/drizzle/schemas";
import { db } from "@/lib/db";
import {
  GetProductsFilterSchema,
  GetProductsOrderBySchema,
  getProductsQuerySchema,
  GetProductsQuerySchema,
} from "@/validators/products/get-products";
import { and, asc, count, desc, eq, ilike, or, SQL } from "drizzle-orm";

const DEFAULT_LIMIT = 20;
const DEFAULT_OFFSET = 0;

async function getProducts(query: GetProductsQuerySchema = {}) {
  const parsedQuery = await getProductsQuerySchema.safeParseAsync(query);

  if (!parsedQuery.success) {
    throw new Error(
      parsedQuery.error.issues[0]?.message ?? parsedQuery.error.message,
    );
  }

  try {
    const {
      filter = {} as GetProductsFilterSchema,
      pagination = {},
      orderBy = {},
    } = parsedQuery.data;
    const { limit = DEFAULT_LIMIT, offset = DEFAULT_OFFSET } = pagination;

    const filters: SQL[] = [];

    if (filter.category) {
      filters.push(eq(categoriesTable.slug, filter.category));
    }

    if (filter.search) {
      const searchPattern = `%${filter.search}%`;

      filters.push(
        or(
          ilike(productsTable.name, searchPattern),
          ilike(productsTable.slug, searchPattern),
          ilike(productsTable.description, searchPattern),
          ilike(categoriesTable.name, searchPattern),
          ilike(categoriesTable.slug, searchPattern),
          ilike(categoriesTable.description, searchPattern),
        )!,
      );
    }

    const orders: SQL[] = [];

    for (const key in orderBy) {
      const orderKey = key as keyof GetProductsOrderBySchema;
      const orderDirection = orderBy[orderKey];

      if (!orderDirection) {
        continue;
      }

      const value = productsTable[orderKey];
      const operator = orderDirection === "asc" ? asc : desc;

      orders.push(operator(value));
    }

    orders.push(asc(productsTable.id));

    const foundProducts = await db
      .select({ product: productsTable, category: categoriesTable })
      .from(productsTable)
      .leftJoin(
        categoriesTable,
        eq(categoriesTable.id, productsTable.categoryId),
      )
      .where(filters.length ? and(...filters) : undefined)
      .orderBy(...orders)
      .limit(limit)
      .offset(offset);

    const [foundTotal] = await db
      .select({ count: count() })
      .from(productsTable)
      .leftJoin(
        categoriesTable,
        eq(categoriesTable.id, productsTable.categoryId),
      )
      .where(filters.length ? and(...filters) : undefined);

    const total = foundTotal ? foundTotal.count : 0;

    const next = offset + limit;
    const nextOffset = next >= total ? null : next;

    return {
      products: foundProducts.map((foundProduct) => foundProduct.product),
      total,
      limit,
      offset,
      nextOffset,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        `[error]: Unexpected error occured upon getting products, ${error.message}.`,
      );
    }

    throw new Error("Unexpected error occured upon getting products.");
  }
}

export { getProducts };
