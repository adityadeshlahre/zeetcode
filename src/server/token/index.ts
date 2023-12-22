"use server";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { api } from "~/trpc/server";

const isLoggedIn: boolean = false;
const isAdmin: boolean = false;
const isTokenExpired: boolean = true;
import { TAdminSchema, TUserSchema, idSchema } from "../api/types";

export async function GetAdminToken(email: string) {
  const getTokenDb: unknown = await api.token.setAdminToken.mutate({
    email,
  });
  console.log(getTokenDb);
  return getTokenDb;
}
export async function SetAdminToken(id: string, token: string) {
  const setTokenDb = await api.token.updateAdminToken.mutate({
    id,
    token,
  });
  console.log(setTokenDb);
  return setTokenDb;
}
export async function DeleteAdminToken(id: string) {
  const deleteTokenDb = await api.token.deleteAdminToken.mutate({ id });
  console.log(deleteTokenDb);
  return deleteTokenDb;
}
export async function GetUserToken(email: string) {
  const getTokenDb = await api.token.setUserToken.mutate({
    email,
  });
  console.log(getTokenDb);
  return getTokenDb;
}
export async function SetUserToken(id: string, token: string) {
  const setTokenDb = await api.token.updateUserToken.mutate({
    id,
    token,
  });
  console.log(setTokenDb);
  return setTokenDb;
}
export async function DeleteUserToken(id: string) {
  const deleteTokenDb = await api.token.deleteUserToken.mutate({ id });
  console.log(deleteTokenDb);
  return deleteTokenDb;
}
