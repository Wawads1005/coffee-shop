"use client";

import { getCategory } from "@/actions/categories/get-category";
import { GetCategoryParamsSchema } from "@/validators/categories/get-category";
import { useQuery } from "@tanstack/react-query";

function useCategoryQuery(params: GetCategoryParamsSchema) {
  const categoryQuery = useQuery({
    queryKey: ["categories", params],
    queryFn: async () => await getCategory(params),
    retry: false,
  });

  return categoryQuery;
}

export { useCategoryQuery };
