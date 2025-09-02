import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./lib/session";
import { cookies } from "next/headers";

const publicRoutes = ["/login", "/"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isPublicRoute = publicRoutes.includes(path);
  const isProtectedRoute = !isPublicRoute;

  const cookie = await cookies();
  let accessToken = cookie.get("access_token")?.value;

  // 非公開ページ　かつ　アクセストークンなし
  if (isProtectedRoute && !accessToken) {
    const refreshToken = cookie.get("refresh_token")?.value;

    // リフレッシュトークンなし　なら　ログインページへリダイレクト
    if (!refreshToken)
      return NextResponse.redirect(new URL("/login", req.nextUrl));

    // リフレッシュトークンがあればアクセストークンを取得
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_ROUTE}/auth/refresh`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          cookie: `refresh_token=${refreshToken}`, // リフレッシュトークン
        },
      }
    );
    const { accessToken } = await res.json();

    // ブラウザに Cookie としてセット
    const response = NextResponse.next();
    if (accessToken)
      response.cookies.set("access_token", accessToken, {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60,
      });

    return response;
  }

  const session = await decrypt(accessToken);

  // 非公開ページ　かつ　未ログイン
  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  // 公開ページ　かつ　ログイン済み
  if (isPublicRoute && session)
    return NextResponse.redirect(new URL(`/u/${session.sub}`, req.nextUrl));

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
