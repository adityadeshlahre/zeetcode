"use server";

import { api } from "~/trpc/server";

export const GetUserId = async (email: string): Promise<string | undefined> => {
  try {
    const user = await api.user.getIdOne.query({ email });
    const admin = await api.admin.getIdAdmin.query({ email });

    const uId: string | undefined = user?.id || admin?.id;
    console.log(uId);

    return uId;
  } catch (error) {
    console.error("Error getting user ID:", error);
    throw new Error("Error getting user ID");
  }
};

export const GetUserPass = async (
  email: string,
): Promise<string | undefined> => {
  try {
    const user = await api.user.getIdOne.query({ email });
    const admin = await api.admin.getIdAdmin.query({ email });

    const uIdPass: string | undefined = user?.password || admin?.password;
    console.log(uIdPass);

    return uIdPass;
  } catch (error) {
    console.error("Error getting user ID:", error);
    throw new Error("Error getting user ID");
  }
};

//Throe Errors fix needed
//apply id else case becase use can be normal user or admin too
//make sure am using typescrip and next js
