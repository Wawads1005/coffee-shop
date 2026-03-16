"use client";

import { authClient } from "@/lib/auth-client";
import { SignUpDataSchema } from "@/validators/auth/signup";
import { useMutation } from "@tanstack/react-query";

function useSignUpMutation() {
  const signUpMutation = useMutation({
    mutationFn: async (data: SignUpDataSchema) => {
      const response = await authClient.signUp.email(data);

      if (!response.data) {
        throw new Error(response.error.message);
      }

      return response;
    },
  });

  return signUpMutation;
}

export { useSignUpMutation };
