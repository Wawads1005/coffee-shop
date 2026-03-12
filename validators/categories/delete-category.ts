import z from "zod";

type DeleteCategoryParamsSchema = z.infer<typeof deleteCategoryParamsSchema>;

const deleteCategoryParamsSchema = z.object({
  id: z.string(),
});

export type { DeleteCategoryParamsSchema };
export { deleteCategoryParamsSchema };
