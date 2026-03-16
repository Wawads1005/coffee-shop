"use server";

import { categoriesTable } from "@/drizzle/schemas";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import {
  createCategoryDataSchema,
  CreateCategoryDataSchema,
} from "@/validators/categories/create-category";
import { eq } from "drizzle-orm";
import { headers as nextHeaders } from "next/headers";

class CreateCategoryError extends Error {}

async function createCategory(data: CreateCategoryDataSchema) {
  const headers = await nextHeaders();

  const permissionResponse = await auth.api.userHasPermission({
    body: { permissions: { categories: ["create"] } },
    headers,
  });

  if (!permissionResponse.success) {
    throw new Error("Unauthorized.");
  }

  const parsedData = await createCategoryDataSchema.safeParseAsync(data);

  if (!parsedData.success) {
    throw new Error(
      parsedData.error.issues[0]?.message || parsedData.error.message,
    );
  }

  try {
    const { name, slug, parentId, description } = parsedData.data;

    const [foundCategory] = await db
      .select()
      .from(categoriesTable)
      .where(eq(categoriesTable.name, name))
      .limit(1);

    if (foundCategory) {
      throw new CreateCategoryError(
        "A category with this name already existed.",
      );
    }

    const [category] = await db
      .insert(categoriesTable)
      .values([{ name, slug, parentId, description }])
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
