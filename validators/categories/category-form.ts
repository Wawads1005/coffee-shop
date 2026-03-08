import z from "zod";

type CategoryFormSchema = z.infer<typeof categoryFormSchema>;

const categoryFormSchema = z.object({
  name: z.string(),
  description: z.string(),
});

export type { CategoryFormSchema };
export { categoryFormSchema };
