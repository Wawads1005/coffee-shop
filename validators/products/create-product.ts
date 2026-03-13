import z from "zod";

type CreateProductDataSchema = z.infer<typeof createProductDataSchema>;

const createProductDataSchema = z.object({
  categoryId: z.string().min(1, { error: "Product category is requried" }),
  name: z.string().min(1, { error: "Product name is required." }),
  slug: z.string().min(1, { error: "Product slug is required." }),
  description: z.string().min(1, { error: "Product description is required." }),
  priceCents: z
    .number()
    .min(1, { error: "Product price is required." })
    .catch(0),
  image: z.string().min(1, { error: "Product image is required." }),
});

export type { CreateProductDataSchema };
export { createProductDataSchema };
