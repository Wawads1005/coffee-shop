"use server";

import { productsTable } from "@/drizzle/schemas";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import {
  createProductDataSchema,
  CreateProductDataSchema,
} from "@/validators/products/create-product";
import { headers as nextHeaders } from "next/headers";

class CreateProductError extends Error {}

async function createProduct(data: CreateProductDataSchema) {
  const headers = await nextHeaders();

  const permissionResponse = await auth.api.userHasPermission({
    body: { permissions: { categories: ["create"] } },
    headers,
  });

  if (!permissionResponse.success) {
    throw new Error("Unauthorized.");
  }

  const parsedData = await createProductDataSchema.safeParseAsync(data);

  if (!parsedData.success) {
    throw new Error(
      parsedData.error.issues[0]?.message || parsedData.error.message,
    );
  }

  try {
    const { categoryId, name, slug, description, priceCents, image } =
      parsedData.data;

    const [product] = await db
      .insert(productsTable)
      .values([{ categoryId, name, slug, description, priceCents, image }])
      .returning();

    if (!product) {
      throw new CreateProductError(
        "Unexpected error occured upon creating a product.",
      );
    }

    return {
      product,
      message: "You have successfully created a product.",
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        `[error]: Unexpected error occured upon creating a product, ${error.message}.`,
      );
    }

    if (error instanceof CreateProductError) {
      throw error;
    }

    throw new Error("Unexpected error occured upon creating a prodduct.");
  }
}

export { createProduct };
