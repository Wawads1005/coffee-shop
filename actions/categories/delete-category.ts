"use server";

import { categoriesTable } from "@/drizzle/schemas";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import {
  deleteCategoryParamsSchema,
  DeleteCategoryParamsSchema,
} from "@/validators/categories/delete-category";
import { and, eq, SQL } from "drizzle-orm";
import { headers as nextHeaders } from "next/headers";

class DeleteCategoryError extends Error {}

async function deleteCategory(params: DeleteCategoryParamsSchema) {
  const headers = await nextHeaders();
  const session = await auth.api.getSession({ headers });

  if (!session) {
    throw new Error("Unauthenticated.");
  }

  const permissionResponse = await auth.api.userHasPermission({
    body: { permissions: { categories: ["delete"] } },
    headers,
  });

  if (!permissionResponse.success) {
    throw new Error("Unauthorized.");
  }
  const parsedParams = await deleteCategoryParamsSchema.safeParseAsync(params);

  if (!parsedParams.success) {
    throw new Error(
      parsedParams.error.issues[0]?.message || parsedParams.error.message,
    );
  }

  try {
    const { id } = parsedParams.data;

    const filters: SQL[] = [];

    filters.push(eq(categoriesTable.id, id));

    const [foundCategory] = await db
      .select()
      .from(categoriesTable)
      .where(filters.length > 0 ? and(...filters) : undefined)
      .limit(1);

    if (!foundCategory) {
      throw new DeleteCategoryError("Category does not exists.");
    }

    await db
      .delete(categoriesTable)
      .where(filters.length > 0 ? and(...filters) : undefined);

    return {
      message: "You successfully deleted a category.",
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        `[error]: Unexpected error occured upon deleting category, ${error.message}.`,
      );
    }

    if (error instanceof DeleteCategoryError) {
      throw error;
    }

    throw new Error("Unexpected error occured upon deleting a category.");
  }
}

export { deleteCategory };
