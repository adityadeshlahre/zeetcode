import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { serialize } from "cookie";
import { sign } from "jsonwebtoken";

const MAX_AGE = 60 * 60 * 1 * 2;
const secret = process.env.JWT_SECRET || "";
const cookie = process.env.COOKIE || "";

export function middleware(request: NextRequest) {
  console.log("fromInsideOfMiddleware");
  const path = request.nextUrl.pathname;

  const isPublicPath = path === "/login" || path === "/signup";

  const token = request.cookies.get("token")?.value || "";

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

export const config = {
  matcher: ["/", "/login", "/register", "/profile", "/profile/*"],
};

export async function POST(request: Request) {
  console.log("fromInsideOfMiddleware2Post");
  const body = await request.json();

  const { username, password } = body;

  if (username !== "admin" || password !== "admin") {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      {
        status: 401,
      },
    );
  }

  const token = sign(
    {
      username,
    },
    secret,
    {
      expiresIn: MAX_AGE,
    },
  );

  const seralized = serialize(cookie, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: MAX_AGE,
    path: "/",
  });

  const response = {
    message: "Authenticated!",
  };

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: { "Set-Cookie": seralized },
  });
}
