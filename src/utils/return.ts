"use server";

import { api } from "~/trpc/server";

export const GetUserId = async (email: string): Promise<string> => {
  //this function need type fixes
  try {
    const user = await api.user.getIdOne.query({ email });
    const uId: string = user?.id || "";
    console.log(uId);

    return uId;
  } catch (error) {
    console.error("Error getting user ID:", error);
    return "undefined";
    // throw new Error("Error getting user ID");
  }
};

export const GetUserPass = async (email: string): Promise<string> => {
  try {
    //this function need type fixes
    console.log("here");
    const user = await api.user.getIdOne.query({ email });
    console.log("here2");
    const uIdPass: string = user?.password || "";
    console.log(uIdPass);
    console.log("here3");
    return uIdPass;
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
    const uId: string = admin?.id || "";
    console.log(uId);

    return uId;
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
    const uIdPass: string = admin?.password || "";
    console.log(uIdPass);
    return uIdPass;
  } catch (error) {
    console.error("Error getting user ID:", error);
    return "undefined";
    // throw new Error("Error getting user ID");
  }
};

//Throe Errors fix needed
//apply id else case becase use can be normal user or admin too
//make sure am using typescrip and next js
