"use client";

import * as React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/query-client";

interface AppQueryClientProviderProps {
  children?: React.ReactNode;
}

function AppQueryClientProvider({ children }: AppQueryClientProviderProps) {
  return (
    <QueryClientProvider client={getQueryClient()}>
      {children}
    </QueryClientProvider>
  );
}

export { AppQueryClientProvider };
