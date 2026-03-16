import { NextRequest, NextResponse, ProxyConfig } from "next/server";
import { headers as nextHeaders } from "next/headers";
import { auth } from "@/lib/auth";

const authRoutes = ["/signup", "/signin"];

export async function proxy(req: NextRequest) {
  const headers = await nextHeaders();
  const session = await auth.api.getSession({ headers });

  if (authRoutes.some((route) => route === req.nextUrl.pathname)) {
    if (session) {
      const homeURL = new URL("/", req.nextUrl.origin);
      const response = NextResponse.redirect(homeURL);

      return response;
    }
  }

  const response = NextResponse.next();

  return response;
}

export const config: ProxyConfig = {
  matcher: ["/((?!api|_next/static|_next/image).*)"],
};
