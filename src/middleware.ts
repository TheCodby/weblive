import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextRequest, NextResponse } from "next/server";

let locales = ["en", "ar"];
function getLocale(request: NextRequest) {
  let headers = { "accept-language": request.headers.get("accept-language")! };
  let languages = new Negotiator({ headers }).languages();
  let locales = ["en", "ar"];
  let defaultLocale = "en";
  return match(languages, locales, defaultLocale);
}
const ignorePaths = ["/assets", "/icon.ico"];
export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const pathname = request.nextUrl.pathname;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", request.nextUrl.pathname);
  const searchParams = new URL(request.nextUrl).searchParams;
  const pathnameIsMissingLocale = locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale}/`) &&
      pathname !== `/${locale}` &&
      !pathname.startsWith(`/oauth`)
  );

  // Redirect if there is no locale
  if (
    pathnameIsMissingLocale &&
    !ignorePaths.some((path) => pathname.startsWith(path))
  ) {
    const locale = getLocale(request);

    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return NextResponse.redirect(
      new URL(
        `/${locale}/${pathname}${searchParams ? `?${searchParams}` : ""}`,
        request.url
      ),
      {
        headers: requestHeaders,
      }
    );
  }
  return NextResponse.next({
    headers: requestHeaders,
  });
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next).*)",
    // Optional: only run on root (/) URL
    // '/'
  ],
};
