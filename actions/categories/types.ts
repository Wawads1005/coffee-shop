import { getCategories } from "@/actions/categories/get-categories";

type GetCategoriesResponse = Awaited<ReturnType<typeof getCategories>>;

export type { GetCategoriesResponse };
