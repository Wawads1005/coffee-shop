"use client";

import { getProduct } from "@/actions/products/get-product";
import { GetProductParamsSchema } from "@/validators/products/get-product";
import { useQuery } from "@tanstack/react-query";

function useProductQuery(params: GetProductParamsSchema) {
  const productQuery = useQuery({
    queryKey: ["products", params],
    queryFn: async () => await getProduct(params),
  });

  return productQuery;
}

export { useProductQuery };
