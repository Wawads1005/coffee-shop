"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Category } from "@/drizzle/schemas";
import { useCategoriesQuery } from "@/hooks/categories/use-categories-query";

interface CategoryNavigationBranchProps {
  category: Category;
}

function CategoryNavigationBranch({ category }: CategoryNavigationBranchProps) {
  const subcategoriesQuery = useCategoriesQuery({
    filter: { parentId: category.id },
  });
  const subcategories = React.useMemo(
    () => (subcategoriesQuery.data ? subcategoriesQuery.data.categories : []),
    [subcategoriesQuery.data],
  );

  if (!subcategories.length) {
    return (
      <NavigationMenuItem className="w-full">
        <NavigationMenuLink
          className={cn(navigationMenuTriggerStyle(), "w-full justify-between")}
          render={
            <Link href={`/products?category=${category.slug}`}>
              {category.name}
            </Link>
          }
        />
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem className="w-full">
      <NavigationMenuTrigger className="w-full justify-between">
        <Link href={`/products?category=${category.slug}`}>
          {category.name}
        </Link>
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavigationMenu side="left">
          <NavigationMenuList className="flex-col">
            {subcategories.map((subcategory) => {
              return (
                <CategoryNavigationBranch
                  key={subcategory.id}
                  category={subcategory}
                />
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}

export { CategoryNavigationBranch };
