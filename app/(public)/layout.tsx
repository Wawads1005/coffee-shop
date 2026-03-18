import * as React from "react";
import { AppNavigationMenu } from "@/components/globals/app-navigation-menu";
import { navigations } from "@/data/navigations";

interface PublicLayoutProps {
  children?: React.ReactNode;
}

function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <React.Fragment>
      <header className="bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 right-0 left-0 z-50 h-16 w-full shadow backdrop-blur">
        <div className="container mx-auto flex h-full w-full max-w-360 items-center justify-between px-4 md:px-8">
          <div className="text-sm font-semibold">Brew & Bean</div>
          <AppNavigationMenu navigations={navigations} />
        </div>
      </header>
      <main>{children}</main>
    </React.Fragment>
  );
}

export default PublicLayout;
