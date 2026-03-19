"use client";

import { authClient } from "@/lib/auth-client";
import { useMutation } from "@tanstack/react-query";

function useSignOutMutation() {
  const signOutMutation = useMutation({
    mutationFn: async () => {
      const response = await authClient.signOut();

      if (!response.data) {
        throw new Error(response.error.message);
      }

      return response.data;
    },
  });

  return signOutMutation;
}

export { useSignOutMutation };
