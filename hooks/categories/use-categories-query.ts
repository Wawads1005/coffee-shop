"use client";

import { getCategories } from "@/actions/categories/get-categories";
import { GetCategoriesQuerySchema } from "@/validators/categories/get-categories";
import { useInfiniteQuery } from "@tanstack/react-query";

function useCategoriesQuery(query?: GetCategoriesQuerySchema) {
  const categoriesQuery = useInfiniteQuery({
    queryKey: ["categories", query],
    queryFn: async ({ pageParam }) =>
      await getCategories({
        ...query,
        pagination: { ...query?.pagination, offset: pageParam },
      }),
    getPreviousPageParam: (firstPage) => firstPage.offset,
    getNextPageParam: (lastPage) => lastPage.nextOffset,
    initialPageParam: 0,
  });

  return categoriesQuery;
}

export { useCategoriesQuery };
