"use client";

import { authClient } from "@/lib/auth-client";
import { SignUpDataSchema } from "@/validators/auth/signup";
import { useMutation } from "@tanstack/react-query";

function useSignUpMutation() {
  const signUpMutation = useMutation({
    mutationFn: async (data: SignUpDataSchema) =>
      await authClient.signUp.email(data),
  });

  return signUpMutation;
}

export { useSignUpMutation };
