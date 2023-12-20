"use server";
import { api } from "~/trpc/server";

export const GetUserId = async (email: string): Promise<string> => {
  try {
    const user = await api.user.getIdOne.query({ email });
    const admin = await api.admin.getIdAdmin.query({ email });

    const uId: string = user!.id || admin!.id;
    console.log(uId);

    return uId;
  } catch (error) {
    console.error("Error getting user ID:", error);
    throw new Error("Error getting user ID");
  }
};

export const GetUserPass = async (email: string): Promise<string> => {
  try {
    const user = await api.user.getIdOne.query({ email });
    const admin = await api.admin.getIdAdmin.query({ email });

    const uIdPass: string = user!.password || admin!.password;
    console.log(uIdPass);

    return uIdPass;
  } catch (error) {
    console.error("Error getting user ID:", error);
    throw new Error("Error getting user ID");
  }
};
