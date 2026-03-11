import z from "zod";
import { queryOrderSchema } from "@/validators/query/query-order";

type GetProductsFilterSchema = z.infer<typeof getProductsFilterSchema>;

const getProductsFilterSchema = z.object({
  search: z.string().optional(),
  category: z.string().optional(),
});

type GetProductsPaginationSchema = z.infer<typeof getProductsPaginationSchema>;

const getProductsPaginationSchema = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
});

type GetProductsOrderBySchema = z.infer<typeof getProductsOrderBySchema>;

const getProductsOrderBySchema = z.object({
  priceCents: queryOrderSchema.optional(),
  name: queryOrderSchema.optional(),
  createdAt: queryOrderSchema.optional(),
  updatedAt: queryOrderSchema.optional(),
});

type GetProductsQuerySchema = z.infer<typeof getProductsQuerySchema>;

const getProductsQuerySchema = z.object({
  filter: getProductsFilterSchema.optional(),
  orderBy: getProductsOrderBySchema.optional(),
  pagination: getProductsPaginationSchema.optional(),
});

export type {
  GetProductsFilterSchema,
  GetProductsPaginationSchema,
  GetProductsOrderBySchema,
  GetProductsQuerySchema,
};
export {
  getProductsFilterSchema,
  getProductsPaginationSchema,
  getProductsOrderBySchema,
  getProductsQuerySchema,
};
