"use server";
// nonUsable functions

import { api } from "~/trpc/server";
import { GetUserId } from "~/utils/return";

// Consider using more descriptive names for these constants
export let isLoggedIn: boolean = false;
export let isAdmin: boolean = false;
export let isValidToken: boolean = false;
export let isTokenExpired: boolean = true;

import { TAdminSchema, TUserSchema, idSchema } from "../api/types";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GetAdminToken(email: string): Promise<string | unknown> {
  const getTokenDb = await api.token.getAdminToken.query({ email });
  console.log(getTokenDb);
  return getTokenDb;
}

export async function SetAdminToken(id: string, token: string) {
  const setTokenDb = await api.token.updateAdminToken.mutate({ id, token });
  localStorage.setItem("token", setTokenDb.token);
  console.log(setTokenDb);
  return setTokenDb;
}

export async function DeleteAdminToken(id: string) {
  const deleteTokenDb = await api.token.deleteAdminToken.mutate({ id });
  console.log(deleteTokenDb);
  return deleteTokenDb;
}

export async function GetUserToken(email: string): Promise<string | unknown> {
  const getTokenDb = await api.token.getUserToken.query({ email });
  console.log(getTokenDb);
  return getTokenDb?.token;
}

export async function CompareToken(email: string): Promise<boolean> {
  const token = await GetUserToken(email); // await is missing here
  // compare if token from the database and set the value of the global isValidToken boolean value
  isValidToken = token === localStorage.getItem("token");
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

export async function IsTokenExpired(email: string): Promise<boolean> {
  const token = await GetUserToken(email);
  const id = GetUserId(email) as unknown as string;
  const tokenDb = await api.admin.getOneAdmin.query({ id });

  // use JWT or another mechanism to check if the token is expired
  // You need to implement the logic to check if the token is expired
  // and update the isTokenExpired variable accordingly
  // Example: isTokenExpired = checkIfTokenIsExpired(tokenDb.token);
  // Replace the above line with your actual logic

  return isTokenExpired;
}

export async function SetUserToken(id: string, token: string) {
  const setTokenDb = await api.token.updateUserToken.mutate({ id, token });
  localStorage.setItem("token", setTokenDb.token);
  console.log(setTokenDb);
  return setTokenDb;
}

export async function DeleteUserToken(id: string) {
  const deleteTokenDb = await api.token.deleteUserToken.mutate({ id });
  console.log(deleteTokenDb);
  return deleteTokenDb;
}

export async function ClearToken() {
  localStorage.clear();
}
