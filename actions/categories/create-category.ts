"use server";

import { categoriesTable } from "@/drizzle/schemas";
import { db } from "@/lib/db";
import { CreateCategoryDataSchema } from "@/validators/categories/create-category";
import { eq } from "drizzle-orm";

class CreateCategoryError extends Error {}

async function createCategory(data: CreateCategoryDataSchema) {
  try {
    const [foundCategory] = await db
      .select()
      .from(categoriesTable)
      .where(eq(categoriesTable.name, data.name))
      .limit(1);

    if (foundCategory) {
      throw new CreateCategoryError(
        "A category with this name already existed.",
      );
    }

    const [category] = await db
      .insert(categoriesTable)
      .values([data])
      .returning();

    if (!category) {
      throw new CreateCategoryError(
        "Unexpected error occured upon creating a category.",
      );
    }

    return {
      message: "You have successfully created a new category.",
      category,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        `[error]: Unexpected error occured upon creating category, ${error.message}.`,
      );
    }

    if (error instanceof CreateCategoryError) {
      throw error;
    }

    throw new Error("Unexpected error occured upon creating a category.");
  }
}

export { createCategory };
