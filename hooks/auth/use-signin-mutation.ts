"use client";

import { authClient } from "@/lib/auth-client";
import { SignInDataSchema } from "@/validators/auth/signin";
import { useMutation } from "@tanstack/react-query";

function useSignInMutation() {
  const signInMutation = useMutation({
    mutationFn: async (data: SignInDataSchema) =>
      await authClient.signIn.email(data),
  });

  return signInMutation;
}

export { useSignInMutation };
