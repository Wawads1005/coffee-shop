"use client";

import { SignUpForm } from "@/components/auth/signup-form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSignUpMutation } from "@/hooks/auth/use-signup-mutation";
import { CircleAlertIcon } from "lucide-react";
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
          >
            {signUpMutation.isError && (
              <Alert variant="destructive">
                <CircleAlertIcon />
                <AlertTitle>Uh-oh, something went wrong!</AlertTitle>
                <AlertDescription>
                  {signUpMutation.error.message}
                </AlertDescription>
              </Alert>
            )}
          </SignUpForm>
        </CardContent>
      </Card>
    </div>
  );
}

export default SignUpPage;
