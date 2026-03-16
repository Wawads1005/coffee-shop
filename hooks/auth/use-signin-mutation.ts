"use client";

import { authClient } from "@/lib/auth-client";
import { SignInDataSchema } from "@/validators/auth/signin";
import { useMutation } from "@tanstack/react-query";

function useSignInMutation() {
  const signInMutation = useMutation({
    mutationFn: async (data: SignInDataSchema) => {
      const response = await authClient.signIn.email(data);

      if (!response.data) {
        throw new Error(response.error.message);
      }

      return response;
    },
  });

  return signInMutation;
}

export { useSignInMutation };
