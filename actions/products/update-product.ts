"use server";

import { productsTable } from "@/drizzle/schemas";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import {
  updateProductDataSchema,
  UpdateProductDataSchema,
  updateProductParamsSchema,
  UpdateProductParamsSchema,
} from "@/validators/products/update-product";
import { eq } from "drizzle-orm";
import { headers as nextHeaders } from "next/headers";

class UpdateProductError extends Error {}

async function updateProduct(
  params: UpdateProductParamsSchema,
  data: UpdateProductDataSchema,
) {
  const headers = await nextHeaders();
  const session = await auth.api.getSession({ headers });

  if (!session) {
    throw new Error("Unauthenticated.");
  }

  const permissionResponse = await auth.api.userHasPermission({
    body: { permissions: { categories: ["update"] } },
    headers,
  });

  if (!permissionResponse.success) {
    throw new Error("Unauthorized.");
  }

  const parsedParams = await updateProductParamsSchema.safeParseAsync(params);
  const parsedData = await updateProductDataSchema.safeParseAsync(data);

  if (!parsedParams.success) {
    throw new Error(
      parsedParams.error.issues[0]?.message || parsedParams.error.message,
    );
  }

  if (!parsedData.success) {
    throw new Error(
      parsedData.error.issues[0]?.message || parsedData.error.message,
    );
  }

  try {
    const { id } = parsedParams.data;
    const { categoryId, name, slug, description, priceCents, image } =
      parsedData.data;

    const [foundProduct] = await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.id, id))
      .limit(1);

    if (!foundProduct) {
      throw new UpdateProductError("Product does not exists.");
    }

    const [product] = await db
      .update(productsTable)
      .set({ categoryId, name, slug, description, priceCents, image })
      .where(eq(productsTable.id, id))
      .returning();

    if (!product) {
      throw new UpdateProductError(
        "Unexpected error occured upon updating a product.",
      );
    }

    return {
      product,
      message: "You have successfully updated a product.",
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        `[error]: Unexpected error occured upon updating a product, ${error.message}.`,
      );
    }

    if (error instanceof UpdateProductError) {
      throw error;
    }

    throw new Error("Unexpected error occured upon updating a prodduct.");
  }
}

export { updateProduct };
