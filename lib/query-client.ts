import { isServer, QueryClient } from "@tanstack/react-query";

let browserQueryClient: QueryClient | undefined = undefined;

function createQueryClient() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: 1000 * 60 } },
  });

  return queryClient;
}

function getQueryClient() {
  if (isServer) {
    const queryClient = createQueryClient();

    return queryClient;
  }

  if (!browserQueryClient) {
    browserQueryClient = createQueryClient();
  }

  return browserQueryClient;
}

export { createQueryClient, getQueryClient };
