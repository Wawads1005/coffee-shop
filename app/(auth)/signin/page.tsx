"use client";

import { SignInForm } from "@/components/auth/signin-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSignInMutation } from "@/hooks/auth/use-signin-mutation";
import Link from "next/link";
import { useRouter } from "next/navigation";

function SignInPage() {
  const router = useRouter();
  const signInMutation = useSignInMutation();

  return (
    <div className="flex h-full items-center justify-center">
      <Card className="w-full max-w-96">
        <CardHeader>
          <CardTitle>Welcome back!</CardTitle>
          <CardDescription>
            <span>Don&apos;t have an account yet? </span>
            <Link className="font-semibold hover:underline" href="/signup">
              Sign Up
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignInForm
            onSubmit={(values) =>
              signInMutation.mutate(
                { ...values, callbackURL: "/" },
                { onSuccess: () => router.replace("/") },
              )
            }
          />
        </CardContent>
      </Card>
    </div>
  );
}

export default SignInPage;
