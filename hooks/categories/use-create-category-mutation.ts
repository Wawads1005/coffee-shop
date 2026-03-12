"use client";

import { createCategory } from "@/actions/categories/create-category";
import { getCategories } from "@/actions/categories/get-categories";
import { Category } from "@/drizzle/schemas";
import { queryKeys } from "@/lib/query-client";
import { GetCategoriesQuerySchema } from "@/validators/categories/get-categories";
import { useMutation } from "@tanstack/react-query";

interface UseCreateCategoryMutationProps {
  query?: GetCategoriesQuerySchema;
}

type GetCategoriesResponse = Awaited<ReturnType<typeof getCategories>>;

function useCreateCategoryMutation(props?: UseCreateCategoryMutationProps) {
  const categoriesQueryKey = queryKeys.categories.collections(props?.query);

  const createCategoryMutation = useMutation({
    mutationFn: createCategory,
    onMutate: async (variables, context) => {
      await context.client.cancelQueries({
        queryKey: categoriesQueryKey,
      });

      const categoriesResponse =
        context.client.getQueryData<GetCategoriesResponse>(categoriesQueryKey);

      context.client.setQueryData<GetCategoriesResponse>(
        categoriesQueryKey,
        (response) => {
          if (!response) {
            return;
          }

          const category: Category = {
            ...variables,
            parentId: variables.parentId ? variables.parentId : null,
            id: crypto.randomUUID(),
            createdAt: new Date(),
            updatedAt: new Date(),
          };

          response.categories = [...response.categories, category];

          return response;
        },
      );

      return { categoriesResponse };
    },
    onError: (_error, _variables, result, context) => {
      context.client.setQueryData<GetCategoriesResponse>(
        categoriesQueryKey,
        () => {
          return result?.categoriesResponse;
        },
      );
    },
    onSuccess: async (_data, _variables, _result, context) => {
      await context.client.invalidateQueries({ queryKey: categoriesQueryKey });
    },
  });

  return createCategoryMutation;
}

export { useCreateCategoryMutation };
