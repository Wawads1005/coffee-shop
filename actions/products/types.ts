import { getProducts } from "./get-products";

type GetProductsResponse = Awaited<ReturnType<typeof getProducts>>;

export type { GetProductsResponse };
