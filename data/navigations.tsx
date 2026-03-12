import { Category } from "@/drizzle/schemas";
import { GetCategoriesQuerySchema } from "@/validators/categories/get-categories";
import { getCategories } from "@/actions/categories/get-categories";
import { CategoryNavigationBranch } from "@/components/categories/category-navigation-branch";

interface NavigationData {
  id: string;
  slug: string;
  name: string;
}

interface Navigation<
  TData extends NavigationData = any,
  TQuery extends Record<string, unknown> = {},
> {
  label: string;
  href: string;
  children?: (data: TData) => React.ReactNode;
  queryFn?: (query?: TQuery) => Promise<TData[]>;
  queryKey?: string;
  query?: TQuery;
}

const category: Navigation<Category, GetCategoriesQuerySchema> = {
  href: "/products",
  label: "Products",
  query: { filter: { parentId: null } },
  queryKey: "categories",
  queryFn: async function (query) {
    const response = await getCategories(query);

    return response.categories;
  },
  children: (category) => (
    <CategoryNavigationBranch key={category.id} category={category} />
  ),
};

const navigations: Navigation[] = [
  { label: "Home", href: "/" },
  category,
  { label: "Contact", href: "/contact" },
];

export type { NavigationData, Navigation };
export { navigations };
