"use server";

import { categoriesTable } from "@/drizzle/schemas";
import { db } from "@/lib/db";
import {
  getCategoryParamsSchema,
  GetCategoryParamsSchema,
} from "@/validators/categories/get-category";
import { eq } from "drizzle-orm";

async function getCategory(params: GetCategoryParamsSchema) {
  const parsedParams = await getCategoryParamsSchema.safeParseAsync(params);

  if (!parsedParams.success) {
    throw new Error(
      parsedParams.error.issues[0]?.message || parsedParams.error.message,
    );
  }

  try {
    const { id } = parsedParams.data;

    const [foundCategory = null] = await db
      .select()
      .from(categoriesTable)
      .where(eq(categoriesTable.id, id))
      .limit(1);

    return {
      category: foundCategory,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        `[error]: Unexpected error occured upon getting category, ${error.message}.`,
      );
    }

    throw new Error("Unexpected error occured upon getting category.");
  }
}

export { getCategory };
