"use client";

import { getProducts } from "@/actions/products/get-products";
import { GetProductsQuerySchema } from "@/validators/products/get-products";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";

function useProductsInfiniteQuery(query?: GetProductsQuerySchema) {
  const productsInfiniteQuery = useInfiniteQuery({
    queryKey: ["products", query],
    queryFn: async ({ pageParam }) =>
      await getProducts({
        ...query,
        pagination: { ...query?.pagination, offset: pageParam },
      }),
    getPreviousPageParam: (firstPage) => firstPage.offset,
    getNextPageParam: (lastPage) => lastPage.nextOffset,
    initialPageParam: 0,
    placeholderData: keepPreviousData,
  });

  return productsInfiniteQuery;
}

export { useProductsInfiniteQuery };
