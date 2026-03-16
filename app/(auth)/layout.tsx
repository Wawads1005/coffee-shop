import * as React from "react";

interface AuthLayoutProps {
  children?: React.ReactNode;
}

function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="grid min-h-screen grid-cols-2">
      <div className="bg-muted-foreground" />
      <div>{children}</div>
    </div>
  );
}

export default AuthLayout;
