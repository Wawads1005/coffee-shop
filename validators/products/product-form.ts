import z from "zod";

type ProductFormSchema = z.infer<typeof productFormSchema>;

const productFormSchema = z.object({
  categoryId: z.string(),
  name: z.string().min(1, { error: "Product name is required." }),
  description: z.string().min(1, { error: "Product description is required." }),
  priceCents: z
    .number()
    .min(1, { error: "Product price is required." })
    .catch(0),
  image: z.string().min(1, { error: "Product image is required." }),
});

export type { ProductFormSchema };
export { productFormSchema };
