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
  TData extends NavigationData | null = null,
  TQuery extends Record<string, unknown> | null = null,
> {
  label: string;
  href: string;
  query?: TQuery;
  queryKey?: "categories";
  queryFn?: (query?: TQuery) => Promise<TData[]>;
  children?: (props: { data: TData }) => React.ReactNode;
}

const home: Navigation = {
  href: "/",
  label: "Home",
};

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

const contact: Navigation = { label: "Contact", href: "/contact" };

const navigations: Navigation<any, any>[] = [home, category, contact];

export type { NavigationData, Navigation };
export { navigations };
