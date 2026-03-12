import z from "zod";

type CategoryFormSchema = z.infer<typeof categoryFormSchema>;

const categoryFormSchema = z.object({
  parentId: z.string().nullable(),
  name: z.string(),
  description: z.string(),
});

export type { CategoryFormSchema };
export { categoryFormSchema };
