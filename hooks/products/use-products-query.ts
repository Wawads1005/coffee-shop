"use client";

import { getProducts } from "@/actions/products/get-products";
import { queryKeys } from "@/lib/query-client";
import { GetProductsQuerySchema } from "@/validators/products/get-products";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

function useProductsQuery(query: GetProductsQuerySchema = {}) {
  const productsQuery = useQuery({
    queryKey: queryKeys.products.collections(query),
    queryFn: async () => await getProducts(query),
    placeholderData: keepPreviousData,
  });

  return productsQuery;
}

export { useProductsQuery };
