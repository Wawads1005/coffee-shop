import { getProducts } from "@/actions/products/get-products";
import { getQueryClient, queryKeys } from "@/lib/query-client";
import { GetProductsQuerySchema } from "@/validators/products/get-products";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import * as React from "react";

interface ProductsLayoutProps {
  children?: React.ReactNode;
}

async function ProductsLayout({ children }: ProductsLayoutProps) {
  const queryClient = getQueryClient();
  const productsQuery: GetProductsQuerySchema = { filter: {} };

  await queryClient.prefetchInfiniteQuery({
    queryKey: queryKeys.products.collections(productsQuery),
    queryFn: async ({ pageParam }) =>
      await getProducts({
        ...productsQuery,
        pagination: { ...productsQuery?.pagination, offset: pageParam },
      }),
    initialPageParam: 0,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}

export default ProductsLayout;
