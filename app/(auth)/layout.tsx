import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect, RedirectType } from "next/navigation";
import * as React from "react";

interface AuthLayoutProps {
  children?: React.ReactNode;
}

async function AuthLayout({ children }: AuthLayoutProps) {
  const sessionResponse = await auth.api.getSession({
    headers: await headers(),
  });

  if (sessionResponse) {
    redirect("/", RedirectType.replace);
  }

  return (
    <div className="grid min-h-screen grid-cols-2">
      <div className="bg-muted-foreground" />
      <div>{children}</div>
    </div>
  );
}

export default AuthLayout;
