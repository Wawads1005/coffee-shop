import z from "zod";

type UpdateProductParamsSchema = z.infer<typeof updateProductParamsSchema>;

const updateProductParamsSchema = z.object({
  id: z.string().min(1, { error: "Product ID is required." }),
});

type UpdateProductDataSchema = z.infer<typeof updateProductDataSchema>;

const updateProductDataSchema = z.object({
  categoryId: z.string().optional(),
  name: z.string().optional(),
  slug: z.string().optional(),
  description: z.string().optional(),
  priceCents: z.number().optional(),
  image: z.string().optional(),
});

export type { UpdateProductDataSchema, UpdateProductParamsSchema };
export { updateProductDataSchema, updateProductParamsSchema };
