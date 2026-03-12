"use client";

import { Category } from "@/drizzle/schemas";
import { getCategories } from "@/actions/categories/get-categories";
import { CategoryNavigationBranch } from "@/components/categories/category-navigation-branch";
import { GetCategoriesQuerySchema } from "@/validators/categories/get-categories";

interface NavigationData {
  id: string;
  slug: string;
  name: string;
}

interface Navigation<
  TData extends NavigationData = NavigationData,
  TQuery extends Record<string, unknown> = {},
> {
  label: string;
  href: string;
  query?: TQuery;
  queryKey?: "categories";
  queryFn?: (query?: TQuery) => Promise<TData[]>;
  children?: (props: { data: TData }) => React.ReactNode;
}

const category: Navigation<Category, GetCategoriesQuerySchema> = {
  href: "/products",
  label: "Products",
  query: { filter: { parentId: null } },
  queryKey: "categories",
  queryFn: async (query) => {
    const response = await getCategories(query);

    return response.categories;
  },
  children: (props) => CategoryNavigationBranch({ category: props.data }),
};

const navigations: Navigation<any>[] = [
  { label: "Home", href: "/" },
  category,
  { label: "Contact", href: "/contact" },
];

export type { NavigationData, Navigation };
export { navigations };
