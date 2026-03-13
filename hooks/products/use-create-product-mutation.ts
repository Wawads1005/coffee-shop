"use client";

import { createProduct } from "@/actions/products/create-product";
import { GetProductsResponse } from "@/actions/products/types";
import { Product } from "@/drizzle/schemas";
import { queryKeys } from "@/lib/query-client";
import { useMutation } from "@tanstack/react-query";

function useCreateProductMutation() {
  const createProductMutation = useMutation({
    mutationFn: createProduct,
    onMutate: async (variables, context) => {
      const productsQueryKey = queryKeys.products.collections();

      await context.client.cancelQueries({ queryKey: productsQueryKey });

      const productsResponse =
        context.client.getQueryData<GetProductsResponse>(productsQueryKey);

      context.client.setQueryData<GetProductsResponse>(
        productsQueryKey,
        (response) => {
          if (!response) {
            return;
          }

          const product: Product = {
            id: crypto.randomUUID(),
            createdAt: new Date(),
            updatedAt: new Date(),
            ...variables,
          };

          response.products = [...response.products, product];

          return response;
        },
      );

      return { productsQueryKey, productsResponse };
    },
    onError: (_error, _variables, result, context) => {
      if (result?.productsQueryKey) {
        context.client.setQueryData<GetProductsResponse>(
          result.productsQueryKey,
          () => {
            return result.productsResponse;
          },
        );
      }
    },
    onSettled: async (_data, _error, _variables, result, context) => {
      if (result?.productsQueryKey) {
        await context.client.invalidateQueries({
          queryKey: result.productsQueryKey,
        });
      }
    },
  });

  return createProductMutation;
}

export { useCreateProductMutation };
