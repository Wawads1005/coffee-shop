"use client";

import * as React from "react";

import { Navigation } from "@/data/navigations";
import { cn } from "@/lib/utils";
import { queryKeys } from "@/lib/query-client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useSessionQuery } from "@/hooks/auth/use-session-query";
import { useSignOutMutation } from "@/hooks/auth/use-signout-mutation";

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
import { Button, buttonVariants } from "@/components/ui/button";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import {
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";

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
          <AppNavigationAuthMenuItem />
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
      <AppNavigationMenuList
        navigation={navigation as Required<Navigation<any, any>>}
      />
    );
  }

  return (
    <NavigationMenuItem>
      <NavigationMenuLink
        className={cn(navigationMenuTriggerStyle(), navigation.className)}
        render={<Link href={navigation.href}>{navigation.label}</Link>}
      />
    </NavigationMenuItem>
  );
}

function AppNavigationMenuList({
  navigation,
}: {
  navigation: Required<Navigation<any, any>>;
}) {
  const dataQuery = useQuery({
    queryKey: queryKeys[navigation.queryKey].collections(navigation.query),
    queryFn: async () => await navigation.queryFn(navigation.query),
  });

  const data = dataQuery.data?.[navigation.queryKey] ?? [];

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>
        <Link href={navigation.href}>{navigation.label}</Link>
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavigationMenu side="left">
          <NavigationMenuList className="flex-col">
            {dataQuery.isLoading
              ? Array.from({ length: 3 }, (_, i) => {
                  return <Skeleton key={i} className="h-8 w-24" />;
                })
              : data.map((item) => {
                  return <navigation.children key={item.id} data={item} />;
                })}
          </NavigationMenuList>
        </NavigationMenu>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}

function AppNavigationAuthMenuItem() {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [isAlertOpen, setIsAlertOpen] = React.useState(false);
  const router = useRouter();
  const sessionResponseQuery = useSessionQuery();
  const sessionResponse = sessionResponseQuery.data
    ? sessionResponseQuery.data
    : null;

  const signOutMutation = useSignOutMutation();

  if (sessionResponseQuery.isLoading) {
    return <Skeleton className="size-9 rounded-full" />;
  }

  if (!sessionResponse) {
    return (
      <NavigationMenuItem>
        <NavigationMenuLink
          className={cn(buttonVariants({ variant: "default" }))}
          render={
            <Link href="/signin">
              <LogInIcon />
              <span>Sign In</span>
            </Link>
          }
        />
      </NavigationMenuItem>
    );
  }

  return (
    <React.Fragment>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarFallback />
            {sessionResponse.user.image && (
              <AvatarImage src={sessionResponse.user.image} />
            )}
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-auto">
          <DropdownMenuGroup>
            <DropdownMenuLabel>
              {sessionResponse.user.name || sessionResponse.user.email}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <UserIcon />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <SettingsIcon />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(event) => {
                event.preventBaseUIHandler();
                setIsDropdownOpen(false);
                setIsAlertOpen(true);
              }}
            >
              <LogOutIcon />
              <span>Sign Out</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDescription>
              This action cannot be undone, by clicking continue you will signed
              out.
            </AlertDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={() => {
                signOutMutation.mutate(undefined, {
                  onSuccess: () => {
                    router.push("/signin");
                  },
                });
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </React.Fragment>
  );
}

export { AppNavigationMenu, AppNavigationMenuItem, AppNavigationMenuList };
