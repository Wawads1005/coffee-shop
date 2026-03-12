import z from "zod";

type CreateCategoryDataSchema = z.infer<typeof createCategoryDataSchema>;

const createCategoryDataSchema = z.object({
  parentId: z.string().nullable().optional(),
  description: z.string().min(1, { error: "Categoy description is required." }),
  name: z.string().min(1, { error: "Category name is required." }),
  slug: z.string().min(1, { error: "Category slug is required." }),
});

export type { CreateCategoryDataSchema };
export { createCategoryDataSchema };
