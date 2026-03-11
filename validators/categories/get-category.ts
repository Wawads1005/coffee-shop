import z from "zod";

type GetCategoryParamsSchema = z.infer<typeof getCategoryParamsSchema>;

const getCategoryParamsSchema = z.object({
  id: z.string().min(1, { error: "CategoryId is required" }),
});

export type { GetCategoryParamsSchema };
export { getCategoryParamsSchema };
