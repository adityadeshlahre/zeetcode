"use client";
//testing routes [frontEnd]
import { api } from "~/trpc/react";

export default function UserProfile() {
  const email: string = "useruser@user.user";
  const userProfile = api.user.getIdOne.useQuery({ email: email });
  return (
    <div>
      <p>{userProfile.data?.token}</p>
      <p>{userProfile.data?.profilePicture}</p>
      <p>{userProfile.data?.id}</p>
      <p>{userProfile.data?.username}</p>
      <p>{userProfile.data?.name}</p>
      <p>{userProfile.data?.email}</p>
      <p>{userProfile.data?.name}</p>
    </div>
  );
}
