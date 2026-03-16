import * as React from "react";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { HomeIcon, PackageIcon, TagsIcon } from "lucide-react";
import { auth } from "@/lib/auth";
import { headers as nextHeaders } from "next/headers";
import { redirect } from "next/navigation";

interface AdminLayoutProps {
  children?: React.ReactNode;
}

async function AdminLayout({ children }: AdminLayoutProps) {
  const headers = await nextHeaders();
  const sessionResponse = await auth.api.getSession({ headers });

  if (!sessionResponse) {
    redirect("/signin");
  }

  if (sessionResponse.user.role !== "admin") {
    redirect("/");
  }

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    tooltip="Home"
                    render={
                      <Link href="/admin">
                        <HomeIcon />
                        <span>Home</span>
                      </Link>
                    }
                  />
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Content Management</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    tooltip="Categories"
                    render={
                      <Link href="/admin/categories">
                        <TagsIcon />
                        <span>Categories</span>
                      </Link>
                    }
                  ></SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    tooltip="Products"
                    render={
                      <Link href="/admin/products">
                        <PackageIcon />
                        <span>Products</span>
                      </Link>
                    }
                  />
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className="bg-background text-foreground sticky top-0 right-0 left-0 z-50 flex h-16 shrink-0 items-center gap-2 border-b px-4 md:px-8">
          <SidebarTrigger className="-ml-2 md:-ml-5" />
          <Separator orientation="vertical" className="mr-4" />
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}

export default AdminLayout;
