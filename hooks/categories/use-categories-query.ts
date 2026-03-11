"use client";

import { getCategories } from "@/actions/categories/get-categories";
import { GetCategoriesQuerySchema } from "@/validators/categories/get-categories";
import { useQuery } from "@tanstack/react-query";

function useCategoriesQuery(query?: GetCategoriesQuerySchema) {
  const categoriesQuery = useQuery({
    queryKey: ["categories", query],
    queryFn: async () => await getCategories(query),
  });

  return categoriesQuery;
}

export { useCategoriesQuery };
