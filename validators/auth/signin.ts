import z from "zod";

type SignInDataSchema = z.infer<typeof signInDataSchema>;

const signInDataSchema = z.object({
  email: z.email().min(1, { error: "Email is required." }),
  password: z.string().min(1, { error: "Password is required." }),
  rememberMe: z.boolean(),
  callbackURL: z.string(),
});

export type { SignInDataSchema };
export { signInDataSchema };
