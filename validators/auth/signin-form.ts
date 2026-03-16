import z from "zod";

type SignInFormSchema = z.infer<typeof signInFormSchema>;

const signInFormSchema = z.object({
  email: z.email().min(1, { error: "Email is required." }),
  password: z.string().min(1, { error: "Password is required." }),
  rememberMe: z.boolean(),
});

export type { SignInFormSchema };
export { signInFormSchema };
