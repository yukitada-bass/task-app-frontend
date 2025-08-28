import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./lib/session";
import { cookies } from "next/headers";

const protectedRoutes = ["/dashboard"];
const publicRoutes = ["/login", "/signup", "/"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const cookie = await cookies();
  let accessToken = cookie.get("access_token")?.value;

  if (isProtectedRoute && !accessToken) {
    const refreshToken = cookie.get("refresh_token")?.value;

    if (!refreshToken)
      return NextResponse.redirect(new URL("/login", req.nextUrl));

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/auth/refresh`, {
      method: "POST",
      credentials: "include",
      headers: {
        cookie: `refresh_token=${refreshToken}`, // リフレッシュトークン
      },
    });

    if (res.ok) {
      const data = await res.json();
      accessToken = data.accessToken;

      // ブラウザに Cookie としてセット
      const response = NextResponse.next();
      accessToken &&
        response.cookies.set("access_token", accessToken, {
          httpOnly: true,
          path: "/",
          maxAge: 60 * 60,
        });

      return response;
    }
  }

  const session = await decrypt(accessToken);

  if (isProtectedRoute && !session?.sub) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (
    isPublicRoute &&
    session?.sub &&
    !req.nextUrl.pathname.startsWith("/dashboard")
  ) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
