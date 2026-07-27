import { NextResponse, type NextRequest } from "next/server";

const LOCALES = new Set(["uz", "ru", "en"]);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const [maybeLocale, ...rest] = pathname.split("/").filter(Boolean);

  if (!LOCALES.has(maybeLocale)) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = rest.length ? `/${rest.join("/")}` : "/";

  const response = NextResponse.rewrite(url);
  response.cookies.set("studify-locale", maybeLocale, {
    path: "/",
    sameSite: "lax",
  });

  return response;
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|favicon.png|icon.png|apple-icon.png|manifest.webmanifest|robots.txt|sitemap.xml).*)"],
};
