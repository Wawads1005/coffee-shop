import z from "zod";

type ProductSearchFormSchema = z.infer<typeof productSearchFormSchema>;

const productSearchFormSchema = z.object({
  search: z.string(),
});

export type { ProductSearchFormSchema };
export { productSearchFormSchema };
