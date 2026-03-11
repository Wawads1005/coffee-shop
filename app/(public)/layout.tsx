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
import { CategoryNavigationBranch } from "@/components/categories/category-navigation-branch";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import { getCategories } from "@/actions/categories/get-categories";

interface PublicLayoutProps {
  children?: React.ReactNode;
}

async function PublicLayout({ children }: PublicLayoutProps) {
  const response = await getCategories();
  const { categories } = response;

  return (
    <React.Fragment>
      <header className="bg-background sticky top-0 right-0 left-0 z-50 h-16 w-full shadow">
        <div className="container mx-auto flex h-full w-full max-w-360 items-center justify-between px-4 md:px-8">
          <div className="text-sm font-semibold">Brew & Bro</div>
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  render={<Link href="/">Home</Link>}
                />
              </NavigationMenuItem>
              <NavigationMenuLink
                className={cn(navigationMenuTriggerStyle())}
                render={<Link href="/about">About</Link>}
              />
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <Link href="/products">Products</Link>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <NavigationMenu side="left">
                    <NavigationMenuList className="flex-col">
                      {categories
                        .filter((category) => category.parentId === null)
                        .map((category) => {
                          return (
                            <CategoryNavigationBranch
                              key={category.id}
                              category={category}
                            />
                          );
                        })}
                    </NavigationMenuList>
                  </NavigationMenu>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className={cn(navigationMenuTriggerStyle())}
                  render={<Link href="/contact">Contact</Link>}
                />
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <Sheet>
            <SheetTrigger
              className="inline-flex md:hidden"
              render={
                <Button variant="ghost" size="icon">
                  <MenuIcon />
                </Button>
              }
            />
            <SheetContent>
              <SheetHeader>
                <SheetTitle></SheetTitle>
                <SheetDescription></SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </header>
      <main>{children}</main>
    </React.Fragment>
  );
}

export default PublicLayout;
