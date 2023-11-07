import { NextResponse } from "next/server";
import acceptLanguage from "accept-language";
import { fallbackLng, languages } from "./app/i18n/settings";
import { withAuth } from "next-auth/middleware";

acceptLanguage.languages(languages);

export const config = {
  // matcher: "/:lng*",
  matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)"],
};

const cookieName = "i18next";

export function middleware(req: any) {
  let lng;
  if (req.cookies.has(cookieName)) {
    lng = acceptLanguage.get(req.cookies.get(cookieName)?.value || "vi");
  }
  if (!lng) lng = acceptLanguage.get(req.headers.get("Accept-Language"));
  if (!lng) lng = fallbackLng;

  if (req.nextUrl.pathname === "/") {
    console.log("redirect to /:lng", lng);
    return NextResponse.redirect(new URL(`/${lng}`, req.url));
  }

  if (req.headers.has("referer")) {
    console.log("referer", req.headers.get("referer"));
    const refererUrl = new URL(req.headers.get("referer"));
    const lngInReferer = languages.find((l) =>
      refererUrl.pathname.startsWith(`/${l}`)
    );
    const response = NextResponse.next();
    if (lngInReferer) response.cookies.set(cookieName, lngInReferer);
    return response;
  }

  return NextResponse.next();
}

export default withAuth({
  pages: {
    signIn: "/:lng",
  },
});
