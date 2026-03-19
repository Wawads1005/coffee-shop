"use client";

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
import { Button, buttonVariants } from "@/components/ui/button";
import {
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";
import { queryKeys } from "@/lib/query-client";
import { useSessionQuery } from "@/hooks/auth/use-session-query";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useSignOutMutation } from "@/hooks/auth/use-signout-mutation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { AlertDescription } from "../ui/alert";
import { useRouter } from "next/navigation";

interface AppNavigationMenuProps {
  navigations: Navigation[];
}

function AppNavigationMenu({ navigations }: AppNavigationMenuProps) {
  return (
    <React.Fragment>
      <NavigationMenu className="hidden md:flex">
        <NavigationMenuList className="gap-1">
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

  const collections = dataQuery.data ? dataQuery.data : [];

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>
        <Link href={navigation.href}>{navigation.label}</Link>
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavigationMenu side="left">
          <NavigationMenuList className="flex-col">
            {collections.map((entity) => {
              return <navigation.children key={entity.id} data={entity} />;
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
  const sessionQuery = useSessionQuery();
  const signOutMutation = useSignOutMutation();
  const router = useRouter();

  if (!sessionQuery.data) {
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
            {sessionQuery.data.user.image && (
              <AvatarImage src={sessionQuery.data.user.image} />
            )}
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-auto">
          <DropdownMenuGroup>
            <DropdownMenuLabel>
              {sessionQuery.data.user.name || sessionQuery.data.user.email}
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
