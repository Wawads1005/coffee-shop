"use client";

import { getProduct } from "@/actions/products/get-product";
import { queryKeys } from "@/lib/query-client";
import { GetProductParamsSchema } from "@/validators/products/get-product";
import { useQuery } from "@tanstack/react-query";

function useProductQuery(params: GetProductParamsSchema) {
  const productQuery = useQuery({
    queryKey: queryKeys.products.entity(params),
    queryFn: async () => await getProduct(params),
  });

  return productQuery;
}

export { useProductQuery };
