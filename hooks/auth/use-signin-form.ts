"use client";

import {
  SignInFormSchema,
  signInFormSchema,
} from "@/validators/auth/signin-form";
import { useForm } from "@tanstack/react-form";

interface UseSignInFormProps {
  defaultValues?: SignInFormSchema;
}

function useSignInForm(props?: UseSignInFormProps) {
  const signUpForm = useForm({
    validators: {
      onChange: signInFormSchema,
      onBlur: signInFormSchema,
      onSubmit: signInFormSchema,
    },
    defaultValues: props?.defaultValues
      ? props.defaultValues
      : {
          email: "",
          password: "",
          rememberMe: false,
        },
  });

  return signUpForm;
}

export type { UseSignInFormProps };
export { useSignInForm };
