"use client";

import { SignUpForm } from "@/components/auth/signup-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSignUpMutation } from "@/hooks/auth/use-signup-mutation";
import Link from "next/link";
import { useRouter } from "next/navigation";

function SignUpPage() {
  const router = useRouter();
  const signUpMutation = useSignUpMutation();

  return (
    <div className="flex h-full items-center justify-center">
      <Card className="w-full max-w-96">
        <CardHeader>
          <CardTitle>Join us!</CardTitle>
          <CardDescription>
            <span>Already have an account? </span>
            <Link className="font-semibold hover:underline" href="/signin">
              Sign In
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignUpForm
            onSubmit={(values) =>
              signUpMutation.mutate(
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

export default SignUpPage;
