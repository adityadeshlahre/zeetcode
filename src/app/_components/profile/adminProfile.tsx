"use client";
//testing routes [frontEnd]
import { api } from "~/trpc/react";

export default function AdminProfile() {
  const email: string = "useruser@user.user";
  const adminProfile = api.admin.getIdAdmin.useQuery({ email: email });
  return (
    <div>
      <p>{adminProfile.data?.token}</p>
      <p>{adminProfile.data?.image}</p>
      <p>{adminProfile.data?.id}</p>
      <p>{adminProfile.data?.username}</p>
      <p>{adminProfile.data?.name}</p>
      <p>{adminProfile.data?.email}</p>
      <p>{adminProfile.data?.name}</p>
    </div>
  );
}
