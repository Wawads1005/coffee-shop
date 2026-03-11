import z from "zod";
import { queryOrderSchema } from "@/validators/query/query-order";

type GetCategoriesFilterSchema = z.infer<typeof getCategoriesFilterSchema>;

const getCategoriesFilterSchema = z.object({
  parentId: z.string().nullable().optional(),
});

type GetCategoriesPaginationSchema = z.infer<
  typeof getCategoriesPaginationSchema
>;

const getCategoriesPaginationSchema = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
});

type GetCategoriesOrderBySchema = z.infer<typeof getCategoriesOrderBySchema>;

const getCategoriesOrderBySchema = z.object({
  name: queryOrderSchema.optional(),
  createdAt: queryOrderSchema.optional(),
  updatedAt: queryOrderSchema.optional(),
});

type GetCategoriesQuerySchema = z.infer<typeof getCategoriesQuerySchema>;

const getCategoriesQuerySchema = z.object({
  filter: getCategoriesFilterSchema.optional(),
  orderBy: getCategoriesOrderBySchema.optional(),
  pagination: getCategoriesPaginationSchema.optional(),
});

export type {
  GetCategoriesFilterSchema,
  GetCategoriesPaginationSchema,
  GetCategoriesOrderBySchema,
  GetCategoriesQuerySchema,
};

export {
  getCategoriesFilterSchema,
  getCategoriesPaginationSchema,
  getCategoriesOrderBySchema,
  getCategoriesQuerySchema,
};
