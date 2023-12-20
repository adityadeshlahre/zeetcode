import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const isLoggedIn: boolean = false;
const isAdmin: boolean = false;
const isTokenExpired: boolean = true;

export async function TokenGenerator(
  request: NextRequest,
  response: NextResponse,
) {
  //two manuplation function
  //set CALLS too
  const token = "3";
  return token;
}
