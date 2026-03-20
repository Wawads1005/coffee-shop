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

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

interface RootLayoutProps {
  children?: React.ReactNode;
}

function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      className={cn("dark font-sans", geist.variable)}
      lang="en"
      suppressHydrationWarning
    >
      <head />
      <body className="flex min-h-screen flex-col antialiased">
        <AppQueryClientProvider>
          <TooltipProvider>
            <NextSSRPlugin routerConfig={extractRouterConfig(fileRouter)} />
            {children}
            <Toaster />
          </TooltipProvider>
        </AppQueryClientProvider>
      </body>
    </html>
  );
}

export default RootLayout;
