import z from "zod";

type UpdateCategoryParamsSchema = z.infer<typeof updateCategoryParamsSchema>;

const updateCategoryParamsSchema = z.object({
  id: z.string(),
});

type UpdateCategoryDataSchema = z.infer<typeof updateCategoryDataSchema>;

const updateCategoryDataSchema = z.object({
  parentId: z.string().nullable().optional(),
  name: z.string().optional(),
  slug: z.string().optional(),
  description: z.string().optional(),
});

export type { UpdateCategoryParamsSchema, UpdateCategoryDataSchema };
export { updateCategoryParamsSchema, updateCategoryDataSchema };
