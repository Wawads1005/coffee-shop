"use client";

import { authClient } from "@/lib/auth-client";
import { useQuery } from "@tanstack/react-query";

function useSessionQuery() {
  const sessionQuery = useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const response = await authClient.getSession();

      if (!response.data) {
        throw new Error(response.error?.message);
      }

      return response.data;
    },
  });

  return sessionQuery;
}

export { useSessionQuery };
