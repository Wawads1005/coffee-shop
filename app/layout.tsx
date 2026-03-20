import "@/styles/globals.css";
import * as React from "react";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { AppQueryClientProvider } from "@/components/globals/app-query-client-provider";
import { extractRouterConfig } from "uploadthing/server";
import { fileRouter } from "@/app/api/uploadthing/core";
import { getQueryClient } from "@/lib/query-client";
import { auth } from "@/lib/auth";
import { headers as nextHeaders } from "next/headers";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

interface RootLayoutProps {
  children?: React.ReactNode;
}

async function RootLayout({ children }: RootLayoutProps) {
  const headers = await nextHeaders();
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["session"],
    queryFn: async () => await auth.api.getSession({ headers }),
  });

  return (
    <html
      className={cn("dark font-sans", geist.variable)}
      lang="en"
      suppressHydrationWarning
    >
      <head />
      <body className="flex min-h-screen flex-col antialiased">
        <AppQueryClientProvider>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <TooltipProvider>
              <NextSSRPlugin routerConfig={extractRouterConfig(fileRouter)} />
              {children}
              <Toaster />
            </TooltipProvider>
          </HydrationBoundary>
        </AppQueryClientProvider>
      </body>
    </html>
  );
}

export default RootLayout;
