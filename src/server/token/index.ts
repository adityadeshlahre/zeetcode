import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { serialize } from "cookie";
import { sign } from "jsonwebtoken";
import { boolean } from "zod";

const MAX_AGE: number = 60 * 60 * 1 * 2;
const secret: string = process.env.JWT_SECRET || "";
const cookie: string = process.env.COOKIE || "";
const isLoggedIn: boolean = false;
const isAdmin: boolean = false;

export async function TokenGenerator(
  request: NextRequest,
  response: NextResponse,
) {
  // create a function which takes the password from trpc call and encrypt it and then return it [user next-jwt package]
  //create a function which check if the user has cookies(token) in the localstorage or not and if user is logged in then isLoggedIn should change to true
  // create a function which checks that user is admin or not which uses trpc call for database
  //
}

// const generateToken = (id: number) => {
//   if (!JWT_SECRET) {
//     throw new Error("JWT_SECRET is not defined");
//   }
//   return jwt.sign({ id }, JWT_SECRET);
// };
