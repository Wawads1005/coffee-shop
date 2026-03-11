"use client";

import { getProducts } from "@/actions/products/get-products";
import { GetProductsQuerySchema } from "@/validators/products/get-products";
import { useQuery } from "@tanstack/react-query";

function useProductsQuery(query?: GetProductsQuerySchema) {
  const productsQuery = useQuery({
    queryKey: ["products", query],
    queryFn: async () => await getProducts(query),
  });

  return productsQuery;
}

export { useProductsQuery };
