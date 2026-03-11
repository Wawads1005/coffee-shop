"use server";

import { productsTable } from "@/drizzle/schemas";
import { db } from "@/lib/db";
import {
  getProductParamsSchema,
  GetProductParamsSchema,
} from "@/validators/products/get-product";
import { eq } from "drizzle-orm";

async function getProduct(params: GetProductParamsSchema) {
  const parsedParams = await getProductParamsSchema.safeParseAsync(params);

  if (!parsedParams.success) {
    throw new Error(
      parsedParams.error.issues[0]?.message || parsedParams.error.message,
    );
  }

  try {
    const { id } = parsedParams.data;

    const [foundProduct = null] = await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.id, id))
      .limit(1);

    return {
      product: foundProduct,
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

export { getProduct };
