"use server";
// nonUsable functions

import { api } from "~/trpc/server";
import { GetUserId } from "~/utils/return";
import { TokenExpiredError, verify } from "jsonwebtoken";
import { TAdminSchema, TUserSchema, idSchema } from "../api/types";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

let isLoggedIn: boolean = false;
let isAdmin: boolean = false;
let isValidToken: boolean = false;
let isTokenExpired: boolean = true;

export async function GetAdminToken(email: string): Promise<string | unknown> {
  const getTokenDb = await api.token.getAdminToken.query({ email });
  console.log(getTokenDb);
  return getTokenDb;
}

export async function SetAdminToken(id: string, token: string) {
  const setTokenDb = await api.token.updateAdminToken.mutate({ id, token });
  console.log(setTokenDb);
  return setTokenDb;
}

export async function DeleteAdminToken(id: string) {
  const deleteTokenDb = await api.token.deleteAdminToken.mutate({ id });
  console.log(deleteTokenDb);
  return deleteTokenDb;
}

export async function GetUserToken(email: string): Promise<string> {
  const getTokenDb = await api.token.getUserToken.query({ email });
  console.log(getTokenDb);
  return getTokenDb?.token as string;
}

export async function SetUserToken(id: string, token: string) {
  const setTokenDb = await api.token.updateUserToken.mutate({ id, token });
  console.log(setTokenDb);
  return setTokenDb;
}

export async function DeleteUserToken(id: string) {
  const deleteTokenDb = await api.token.deleteUserToken.mutate({ id });
  return deleteTokenDb;
}

export async function CompareToken(
  email: string,
  clientToken: string,
): Promise<boolean> {
  const token = await GetUserToken(email);
  isValidToken = token === clientToken;
  return isValidToken;
}

export async function IsAdmin(email: string): Promise<boolean> {
  const token = await GetUserToken(email);
  const id = GetUserId(email) as unknown as string;
  const tokenDb = await api.admin.getOneAdmin.query({ id });
  isAdmin = token === tokenDb?.token;
  return isAdmin;
}

export async function IsLoggedIn(email: string): Promise<boolean> {
  const token = await GetUserToken(email);
  const id = GetUserId(email) as unknown as string;
  const tokenDb = await api.admin.getOneAdmin.query({ id });
  isLoggedIn = token === tokenDb?.token;
  return isLoggedIn;
}

export async function IsTokenExpiredCheck(email: string): Promise<boolean> {
  // const token = await GetUserToken(email);
  const id = (await GetUserId(email)) as unknown as string;
  try {
    const tokenDb = await api.admin.getOneAdmin.query({ id });
    const token = tokenDb?.token as string;
    verify(token, process.env.JWT_SECRET || "tokEN");
    isTokenExpired = false;
    return false;
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      isTokenExpired = true;
      return true;
    } else {
      console.error("JWT Verification Error:", error);
      isTokenExpired = true;
      return true;
    }
  }
}
