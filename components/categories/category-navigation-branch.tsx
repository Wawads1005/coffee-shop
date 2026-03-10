import Link from "next/link";
import { cn } from "@/lib/utils";
import { categories, Category } from "@/data/categories";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

interface CategoryNavigationBranchProps {
  category: Category;
}

function CategoryNavigationBranch({ category }: CategoryNavigationBranchProps) {
  const subcategories = categories.filter(
    (subcategory) => subcategory.parentId === category.id,
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
