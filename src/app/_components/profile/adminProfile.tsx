"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
//testing routes [frontEnd]
import { api } from "~/trpc/react";

export default function AdminProfile() {
  const router = useRouter();
  const [token, setToken] = useState<string>("");
  useEffect(() => {
    const token = localStorage.getItem("token") as string;
    if (!token) {
      console.error("Admin Token is not there please login");
      router.push("/admin/login");
    }
    setToken(token);
  });
  const email = api.admin.getTokenOne.useQuery(
    { token: token },
    { enabled: true },
  );
  const adminProfile = api.admin.getIdAdmin.useQuery(
    {
      email: email.data?.email as string,
    },
    {
      enabled: true,
    },
  );

  if (adminProfile.error) {
    return <div>Error loading user profile</div>;
  }

  if (adminProfile.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h4>Admin Profile:</h4>
      <p>
        <strong>Token:</strong> {adminProfile.data?.token}
      </p>
      <p>
        <strong>Image:</strong> {adminProfile.data?.image}
      </p>
      <p>
        <strong>ID:</strong> {adminProfile.data?.id}
      </p>
      <p>
        <strong>Username:</strong> {adminProfile.data?.username}
      </p>
      <p>
        <strong>Name:</strong> {adminProfile.data?.name}
      </p>
      <p>
        <strong>Email:</strong> {adminProfile.data?.email}
      </p>
    </div>
  );
}
