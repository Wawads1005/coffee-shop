import z from "zod";

type QueryOrderSchema = z.infer<typeof queryOrderSchema>;

const queryOrderSchema = z.enum(["asc", "desc"]);

export type { QueryOrderSchema };
export { queryOrderSchema };
