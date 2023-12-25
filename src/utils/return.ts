"use server";

import { api } from "~/trpc/server";

export const GetUserId = async (email: string): Promise<string> => {
  //this function need type fixes
  try {
    const user = await api.user.getIdOne.query({ email });
    const userId: string = user?.id || "";
    console.log(userId);

    return userId;
  } catch (error) {
    console.error("Error getting user ID:", error);
    return "undefined";
    // throw new Error("Error getting user ID");
  }
};

export const GetUserPass = async (email: string): Promise<string> => {
  try {
    //this function need type fixes
    const user = await api.user.getIdOne.query({ email });
    console.log("here2");
    const userPass: string = user?.password || "";
    console.log(userPass);
    console.log("here3");
    return userPass;
  } catch (error) {
    console.error("Error getting user ID:", error);
    return "undefined";
    // throw new Error("Error getting user ID");
  }
};

export const GetAdminId = async (email: string): Promise<string> => {
  //this function need type fixes
  try {
    const admin = await api.admin.getIdAdmin.query({ email });
    const adminId: string = admin?.id || "";
    console.log(adminId);

    return adminId;
  } catch (error) {
    console.error("Error getting user ID:", error);
    return "undefined";
    // throw new Error("Error getting user ID");
  }
};

export const GetAdminPass = async (email: string): Promise<string> => {
  try {
    //this function need type fixes
    const admin = await api.admin.getIdAdmin.query({ email });
    const adminPass: string = admin?.password || "";
    console.log(adminPass);
    return adminPass;
  } catch (error) {
    console.error("Error getting user ID:", error);
    return "undefined";
    // throw new Error("Error getting user ID");
  }
};

//Throe Errors fix needed
//apply id else case becase use can be normal user or admin too
//make sure am using typescrip and next js
