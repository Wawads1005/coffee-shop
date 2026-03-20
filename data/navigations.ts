"use client";

import * as React from "react";
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
  TQueryKey extends "categories" = "categories",
> {
  label: string;
  href: string;
  className?: string;
  query?: TQuery;
  queryKey?: TQueryKey;
  queryFn?: (query?: TQuery) => Promise<{ [data in TQueryKey]: TData[] }>;
  children?: (props: { data: TData }) => React.ReactNode;
}

const home: Navigation = {
  href: "/",
  label: "Home",
};

const about: Navigation = { label: "About", href: "/#about" };

const contact: Navigation = { label: "Contact", href: "/#contact" };

const category: Navigation<Category, GetCategoriesQuerySchema> = {
  href: "/products",
  label: "Products",
  query: { filter: { parentId: null } },
  queryKey: "categories",
  queryFn: async (query) => {
    const response = await getCategories(query);

    return response;
  },
  children: (props) => CategoryNavigationBranch({ category: props.data }),
};

const navigations: Navigation<any, any>[] = [home, about, contact, category];

export type { NavigationData, Navigation };
export { navigations };
