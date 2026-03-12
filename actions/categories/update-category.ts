"use server";

import { categoriesTable } from "@/drizzle/schemas";
import { db } from "@/lib/db";
import {
  updateCategoryDataSchema,
  UpdateCategoryDataSchema,
  updateCategoryParamsSchema,
  UpdateCategoryParamsSchema,
} from "@/validators/categories/update-category";
import { and, eq, SQL } from "drizzle-orm";

class UpdateCategoryError extends Error {}

async function updateCategory(
  params: UpdateCategoryParamsSchema,
  data: UpdateCategoryDataSchema,
) {
  const parsedParams = await updateCategoryParamsSchema.safeParseAsync(params);

  if (!parsedParams.success) {
    throw new Error(
      parsedParams.error.issues[0]?.message || parsedParams.error.message,
    );
  }

  const parsedData = await updateCategoryDataSchema.safeParseAsync(data);

  if (!parsedData.success) {
    throw new Error(
      parsedData.error.issues[0]?.message || parsedData.error.message,
    );
  }

  try {
    const { id } = parsedParams.data;
    const { description, name, slug, parentId } = parsedData.data;

    const filters: SQL[] = [];

    filters.push(eq(categoriesTable.id, id));

    const [foundCategory] = await db
      .select()
      .from(categoriesTable)
      .where(filters.length > 0 ? and(...filters) : undefined);

    if (!foundCategory) {
      throw new UpdateCategoryError("Category does not exists.");
    }

    const [category] = await db
      .update(categoriesTable)
      .set({ description, name, slug, parentId })
      .where(filters.length > 0 ? and(...filters) : undefined)
      .returning();

    if (!category) {
      throw new UpdateCategoryError(
        "Unexpected error occured upon updating category.",
      );
    }

    return {
      message: "You have successfully updated a category.",
      category,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        `[error]: Unexpected error occured upon creating category, ${error.message}.`,
      );
    }

    if (error instanceof UpdateCategoryError) {
      throw error;
    }

    throw new Error("Unexpected error occured upon creating a category.");
  }
}

export { updateCategory };
