import z from "zod";

type GetProductParamsSchema = z.infer<typeof getProductParamsSchema>;

const getProductParamsSchema = z.object({
  id: z.string().min(1, { error: "ProductId is required" }),
});

export type { GetProductParamsSchema };
export { getProductParamsSchema };
