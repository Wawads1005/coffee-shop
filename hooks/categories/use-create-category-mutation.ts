"use client";

import { createCategory } from "@/actions/categories/create-category";
import { GetCategoriesResponse } from "@/actions/categories/types";
import { Category } from "@/drizzle/schemas";
import { queryKeys } from "@/lib/query-client";
import { useMutation } from "@tanstack/react-query";

function useCreateCategoryMutation() {
  const createCategoryMutation = useMutation({
    mutationFn: createCategory,
    onMutate: async (variables, context) => {
      const categoriesQueryKey = queryKeys.categories.collections();

      await context.client.cancelQueries({ queryKey: categoriesQueryKey });

      const categoriesResponse =
        context.client.getQueryData<GetCategoriesResponse>(categoriesQueryKey);

      context.client.setQueryData<GetCategoriesResponse>(
        categoriesQueryKey,
        (categoriesResponse) => {
          if (!categoriesResponse) {
            return;
          }

          const category: Category = {
            ...variables,
            id: crypto.randomUUID(),
            parentId:
              typeof variables.parentId !== "undefined"
                ? variables.parentId
                : null,
            createdAt: new Date(),
            updatedAt: new Date(),
          };

          categoriesResponse.categories = [
            ...categoriesResponse.categories,
            category,
          ];

          return categoriesResponse;
        },
      );

      return { categoriesResponse, categoriesQueryKey };
    },
    onError: (_error, _variables, result, context) => {
      if (result?.categoriesQueryKey) {
        context.client.setQueryData<GetCategoriesResponse>(
          result.categoriesQueryKey,
          () => {
            return result?.categoriesResponse;
          },
        );
      }
    },
    onSettled: async (_data, _error, _variables, result, context) => {
      if (result?.categoriesQueryKey) {
        await context.client.invalidateQueries({
          queryKey: result.categoriesQueryKey,
        });
      }
    },
  });

  return createCategoryMutation;
}

export { useCreateCategoryMutation };
