import { SignUpForm } from "@/components/auth/signup-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

function SignUpPage() {
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
          <SignUpForm />
        </CardContent>
      </Card>
    </div>
  );
}

export default SignUpPage;
