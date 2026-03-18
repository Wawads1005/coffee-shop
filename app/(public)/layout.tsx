import * as React from "react";
import { AppNavigationMenu } from "@/components/globals/app-navigation-menu";
import { navigations } from "@/data/navigations";
import {
  CoffeeIcon,
  MailIcon,
  MapIcon,
  MapPinIcon,
  PhoneIcon,
} from "lucide-react";
import Link from "next/link";

interface PublicLayoutProps {
  children?: React.ReactNode;
}

function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <React.Fragment>
      <header className="bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 right-0 left-0 z-50 h-16 w-full shadow backdrop-blur">
        <div className="container mx-auto flex h-full w-full max-w-360 items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-2">
            <CoffeeIcon className="fill-primary-foreground stroke-primary mb-2 size-10" />
            <div className="text-sm font-semibold">Brew & Bean</div>
          </div>
          <AppNavigationMenu navigations={navigations} />
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="bg-muted text-muted-foreground">
        <div className="mx-auto w-full max-w-360 px-4 py-8 md:px-8 md:py-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-16 lg:grid-cols-4">
            <div className="col-span-1 sm:col-span-2">
              <div className="flex items-center gap-2">
                <CoffeeIcon className="fill-primary-foreground stroke-primary mb-2 size-10" />
                <div className="text-sm font-semibold">Brew & Bean</div>
              </div>
              <p className="text-muted-foreground text-sm">
                Your neighborhood coffee shop where every cup is crafted with
                passion and every visit feels like home.
              </p>
            </div>
            <div className="space-y-4">
              <div className="text-lg font-semibold">Quick Links</div>
              <nav>
                <ul className="grid gap-2 [&>li]:hover:underline">
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  <li>
                    <Link href="/#about">About</Link>
                  </li>
                  <li>
                    <Link href="/#contact">Contact</Link>
                  </li>
                  <li>
                    <Link href="/products">Products</Link>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="space-y-4">
              <div className="text-lg font-semibold">Contacts</div>
              <nav>
                <ul className="grid gap-2 [&>li]:flex [&>li]:items-center [&>li]:gap-2 [&>li]:[&_svg]:size-4">
                  <li>
                    <PhoneIcon />
                    <span>+6395 5401 6948</span>
                  </li>
                  <li>
                    <MailIcon />
                    <span>janjoshuadeguzman00@gmail.com</span>
                  </li>
                  <li>
                    <MapPinIcon />
                    <span>Manuel Vega St., Brgy. Consolacion</span>
                  </li>
                  <li>
                    <MapIcon />
                    <span>City of Cagayan de Oro</span>
                  </li>
                  <li></li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </footer>
    </React.Fragment>
  );
}

export default PublicLayout;
