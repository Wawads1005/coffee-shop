import z from "zod";

type SignUpFormSchema = z.infer<typeof signUpFormSchema>;

const signUpFormSchema = z
  .object({
    name: z.string().min(1, { error: "Name is required." }),
    email: z.email().min(1, { error: "Email is required." }),
    password: z.string().min(1, { error: "Password is required." }),
    confirmPassword: z.string().min(1, { error: "Confirm your password." }),
    rememberMe: z.boolean(),
  })
  .refine((value) => value.password === value.confirmPassword, {
    error: "Password does not matched.",
    path: ["confirmPassword"],
  });

export type { SignUpFormSchema };
export { signUpFormSchema };
