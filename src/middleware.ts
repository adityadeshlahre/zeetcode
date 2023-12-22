import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest, response: NextResponse) {
  // const path = request.nextUrl.pathname;
  // const isPublicPath = path === "/login" || path === "/register";
  // const token = request.cookies.get("token")?.value || "";
  // if (isPublicPath && token) {
  //   return NextResponse.redirect(new URL("/", request.nextUrl));
  // }
  // if (!isPublicPath && !token) {
  //   return NextResponse.redirect(new URL("/login", request.nextUrl));
  // }
}

export const config = {
  // matcher: ["/login", "/register", "/api/:path*", "/challenges/:path*"],
};

//need function changes [ isLoggedIn]
//path changes needed
