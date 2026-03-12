import { GetCategoriesQuerySchema } from "@/validators/categories/get-categories";
import { GetCategoryParamsSchema } from "@/validators/categories/get-category";
import { GetProductParamsSchema } from "@/validators/products/get-product";
import { GetProductsQuerySchema } from "@/validators/products/get-products";
import { isServer, QueryClient } from "@tanstack/react-query";

let browserQueryClient: QueryClient | undefined = undefined;

function createQueryClient() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: 1000 * 60 } },
  });

  return queryClient;
}

function getQueryClient() {
  if (isServer) {
    const queryClient = createQueryClient();

    return queryClient;
  }

  if (!browserQueryClient) {
    browserQueryClient = createQueryClient();
  }

  return browserQueryClient;
}

const queryKeys = {
  products: {
    base: ["products"],
    collections: function (query?: GetProductsQuerySchema) {
      return [...this.base, query];
    },
    entity: function (params: GetProductParamsSchema) {
      return [...this.base, params];
    },
  },
  categories: {
    base: ["categories"],
    collections: function (query?: GetCategoriesQuerySchema) {
      return [...this.base, query];
    },
    entity: function (params: GetCategoryParamsSchema) {
      return [...this.base, params];
    },
  },
};

export { createQueryClient, getQueryClient, queryKeys };
