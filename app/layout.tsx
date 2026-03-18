import "@/styles/globals.css";
import * as React from "react";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { AppQueryClientProvider } from "@/components/globals/app-query-client-provider";

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
      <body className="min-h-screen antialiased">
        <AppQueryClientProvider>
          <TooltipProvider>
            {children}
            <Toaster />
          </TooltipProvider>
        </AppQueryClientProvider>
      </body>
    </html>
  );
}

export default RootLayout;
