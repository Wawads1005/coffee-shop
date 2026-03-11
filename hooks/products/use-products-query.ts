"use client";

import { getProducts } from "@/actions/products/get-products";
import { GetProductsQuerySchema } from "@/validators/products/get-products";
import { useInfiniteQuery } from "@tanstack/react-query";

function useProductsQuery(query?: GetProductsQuerySchema) {
  const productsQuery = useInfiniteQuery({
    queryKey: ["products", query],
    queryFn: async ({ pageParam }) =>
      await getProducts({
        ...query,
        pagination: { ...query?.pagination, offset: pageParam },
      }),
    getPreviousPageParam: (firstPage) => firstPage.offset,
    getNextPageParam: (lastPage) => lastPage.nextOffset,
    initialPageParam: 0,
  });

  return productsQuery;
}

export { useProductsQuery };
