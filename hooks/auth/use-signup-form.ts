"use client";

import {
  SignUpFormSchema,
  signUpFormSchema,
} from "@/validators/auth/signup-form";
import { useForm } from "@tanstack/react-form";

interface UseSignUpFormProps {
  defaultValues?: SignUpFormSchema;
}

function useSignUpForm(props?: UseSignUpFormProps) {
  const signUpForm = useForm({
    validators: {
      onChange: signUpFormSchema,
      onBlur: signUpFormSchema,
      onSubmit: signUpFormSchema,
    },
    defaultValues: props?.defaultValues
      ? props.defaultValues
      : {
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          rememberMe: false,
        },
  });

  return signUpForm;
}

export type { UseSignUpFormProps };
export { useSignUpForm };
