"use server";

import { productsTable } from "@/drizzle/schemas";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import {
  deleteProductParamsSchema,
  DeleteProductParamsSchema,
} from "@/validators/products/delete-product";
import { and, eq, SQL } from "drizzle-orm";
import { headers as nextHeaders } from "next/headers";

class DeleteProductError extends Error {}

async function deleteProduct(params: DeleteProductParamsSchema) {
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

  const parsedParams = await deleteProductParamsSchema.safeParseAsync(params);

  if (!parsedParams.success) {
    throw new Error(
      parsedParams.error.issues[0]?.message || parsedParams.error.message,
    );
  }
  try {
    const { id } = parsedParams.data;

    const filters: SQL[] = [];

    filters.push(eq(productsTable.id, id));

    const [foundProduct] = await db
      .select()
      .from(productsTable)
      .where(filters.length > 0 ? and(...filters) : undefined)
      .limit(1);

    if (!foundProduct) {
      throw new DeleteProductError("Product does not exists.");
    }

    await db
      .delete(productsTable)
      .where(filters.length > 0 ? and(...filters) : undefined);

    return {
      message: "You successfully deleted a product.",
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        `[error]: Unexpected error occured upon deleting product, ${error.message}.`,
      );
    }

    if (error instanceof DeleteProductError) {
      throw error;
    }

    throw new Error("Unexpected error occured upon deleting a product.");
  }
}

export { deleteProduct };
