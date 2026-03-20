"use client";

import { getProducts } from "@/actions/products/get-products";
import { queryKeys } from "@/lib/query-client";
import { GetProductsQuerySchema } from "@/validators/products/get-products";
import { useInfiniteQuery } from "@tanstack/react-query";

function useProductsInfiniteQuery(query: GetProductsQuerySchema = {}) {
  const productsInfiniteQuery = useInfiniteQuery({
    queryKey: queryKeys.products.collections(query),
    queryFn: async ({ pageParam }) =>
      await getProducts({
        ...query,
        pagination: { ...query?.pagination, offset: pageParam },
      }),
    getPreviousPageParam: (firstPage) => firstPage.offset,
    getNextPageParam: (lastPage) => lastPage.nextOffset,
    initialPageParam: 0,
  });

  return productsInfiniteQuery;
}

export { useProductsInfiniteQuery };
