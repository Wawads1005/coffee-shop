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
    onSuccess: async (_data, _variables, _result, context) => {
      await context.client.cancelQueries({ queryKey: ["session"] });
      await context.client.invalidateQueries({ queryKey: ["session"] });
      await context.client.setQueryData(["session"], () => {
        return null;
      });
    },
  });

  return signOutMutation;
}

export { useSignOutMutation };
