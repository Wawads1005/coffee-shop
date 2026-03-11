"use server";

import { categoriesTable } from "@/drizzle/schemas";
import { db } from "@/lib/db";
import {
  GetCategoriesOrderBySchema,
  getCategoriesQuerySchema,
  GetCategoriesQuerySchema,
} from "@/validators/categories/get-categories";
import { and, asc, count, desc, eq, isNull, SQL } from "drizzle-orm";

const DEFAULT_LIMIT = 20;
const DEFAULT_OFFSET = 0;

async function getCategories(query: GetCategoriesQuerySchema = {}) {
  const parsedQuery = await getCategoriesQuerySchema.safeParseAsync(query);

  if (!parsedQuery.success) {
    throw new Error(
      parsedQuery.error.issues[0]?.message ?? parsedQuery.error.message,
    );
  }

  try {
    const { filter = {}, pagination = {}, orderBy = {} } = parsedQuery.data;
    const { limit = DEFAULT_LIMIT, offset = DEFAULT_OFFSET } = pagination;

    const filters: SQL[] = [];

    if (typeof filter.parentId !== "undefined") {
      filters.push(
        filter.parentId !== null
          ? eq(categoriesTable.parentId, filter.parentId)
          : isNull(categoriesTable.parentId),
      );
    }

    const orders: SQL[] = [];

    for (const key in orderBy) {
      const orderKey = key as keyof GetCategoriesOrderBySchema;
      const orderDirection = orderBy[orderKey];

      if (!orderDirection) {
        continue;
      }

      const value = categoriesTable[orderKey];
      const operator = orderDirection === "asc" ? asc : desc;

      orders.push(operator(value));
    }

    orders.push(asc(categoriesTable.id));

    const foundCategories = await db
      .select()
      .from(categoriesTable)
      .where(filters.length ? and(...filters) : undefined)
      .orderBy(...orders)
      .limit(limit)
      .offset(offset);

    const [foundTotal] = await db
      .select({ count: count() })
      .from(categoriesTable)
      .where(filters.length ? and(...filters) : undefined);

    const total = foundTotal ? foundTotal.count : 0;

    const next = offset + limit;
    const nextOffset = next >= total ? null : next;

    return {
      categories: foundCategories,
      limit,
      offset,
      total,
      nextOffset,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        `[error]: Unexpected error occured upon getting categories, ${error.message}.`,
      );
    }

    throw new Error("Unexpected error occured upon getting categories.");
  }
}

export { getCategories };
