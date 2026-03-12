import * as React from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

import { cn } from "@/lib/utils";
import { Navigation } from "@/data/navigations";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
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

interface AppNavigationMenuProps {
  navigations: Navigation[];
}

function AppNavigationMenu({ navigations }: AppNavigationMenuProps) {
  return (
    <React.Fragment>
      <NavigationMenu className="hidden md:flex">
        <NavigationMenuList>
          {navigations.map((navigation) => {
            return (
              <AppNavigationMenuItem
                key={navigation.href}
                navigation={navigation}
              />
            );
          })}
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
    </React.Fragment>
  );
}

function AppNavigationMenuItem({ navigation }: { navigation: Navigation }) {
  if (navigation.queryFn && navigation.children && navigation.query) {
    return (
      <AppNavigationMenuList navigation={navigation as Required<Navigation>} />
    );
  }

  return (
    <NavigationMenuItem>
      <NavigationMenuLink
        className={cn(navigationMenuTriggerStyle())}
        render={<Link href={navigation.href}>{navigation.label}</Link>}
      />
    </NavigationMenuItem>
  );
}

function AppNavigationMenuList({
  navigation,
}: {
  navigation: Required<Navigation>;
}) {
  const dataQuery = useQuery({
    queryKey: [navigation.queryKey, navigation.query],
    queryFn: async () => await navigation.queryFn(navigation.query),
  });

  const data = dataQuery.data ? dataQuery.data : [];

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>
        <Link href={navigation.href}>{navigation.label}</Link>
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavigationMenu side="left">
          <NavigationMenuList className="flex-col">
            {data.map((item) => {
              const component = navigation.children(item);

              return component;
            })}
          </NavigationMenuList>
        </NavigationMenu>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}

export { AppNavigationMenu, AppNavigationMenuItem, AppNavigationMenuList };
