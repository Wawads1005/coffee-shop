import z from "zod";

type SignUpDataSchema = z.infer<typeof signUpDataSchema>;

const signUpDataSchema = z.object({
  name: z.string().min(1, { error: "Name is required." }),
  email: z.email().min(1, { error: "Email is required." }),
  password: z.string().min(1, { error: "Password is required." }),
  rememberMe: z.boolean(),
  callbackURL: z.string(),
});

export type { SignUpDataSchema };
export { signUpDataSchema };
