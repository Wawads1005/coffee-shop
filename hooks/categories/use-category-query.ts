"use client";

import { getCategory } from "@/actions/categories/get-category";
import { queryKeys } from "@/lib/query-client";
import { GetCategoryParamsSchema } from "@/validators/categories/get-category";
import { useQuery } from "@tanstack/react-query";

function useCategoryQuery(params: GetCategoryParamsSchema) {
  const categoryQuery = useQuery({
    queryKey: queryKeys.categories.entity(params),
    queryFn: async () => await getCategory(params),
  });

  return categoryQuery;
}

export { useCategoryQuery };
