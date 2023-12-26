"use server";

//nonUsable functions
import { api } from "~/trpc/server";

export const GetUserId = async (email: string): Promise<string> => {
  //this function need type fixes
  try {
    const user = await api.user.getIdOne.query({ email: email });
    const userId: string = user?.id as string;

    return userId;
  } catch (error) {
    console.error("Error getting user ID:", error);
    // return "undefined";
    throw new Error("Error getting user ID");
  }
};

export const GetUserPass = async (email: string): Promise<string> => {
  try {
    //this function need type fixes
    const user = await api.user.getIdOne.query({ email: email });
    const userPass: string = user?.password as string;

    return userPass;
  } catch (error) {
    console.error("Error getting user ID:", error);
    // return "undefined";
    throw new Error("Error getting user ID");
  }
};

export const GetAdminId = async (email: string): Promise<string> => {
  //this function need type fixes
  try {
    const admin = await api.admin.getIdAdmin.query({ email: email });
    const adminId: string = admin?.id as string;

    return adminId;
  } catch (error) {
    console.error("Error getting user ID:", error);
    // return "undefined";
    throw new Error("Error getting user ID");
  }
};

export const GetAdminPass = async (email: string): Promise<string> => {
  try {
    //this function need type fixes
    const admin = await api.admin.getIdAdmin.query({ email: email });
    const adminPass: string = admin?.password as string;

    return adminPass;
  } catch (error) {
    console.error("Error getting user ID:", error);
    // return "undefined";
    throw new Error("Error getting user ID");
  }
};
