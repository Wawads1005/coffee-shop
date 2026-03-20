import z from "zod";

type DeleteProductParamsSchema = z.infer<typeof deleteProductParamsSchema>;

const deleteProductParamsSchema = z.object({
  id: z.string().min(1, { error: "Product ID is required." }),
});

export type { DeleteProductParamsSchema };
export { deleteProductParamsSchema };
