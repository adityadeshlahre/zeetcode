"use client";
import { useState, useEffect } from "react";
import { api } from "~/trpc/react";

export default function UserProfile() {
  const [token, setToken] = useState<string>("");
  //this function is showing as not defined [^]
  const email = api.user.getTokenOne.useQuery(
    { token: token },
    { enabled: true },
  );
  const userProfile = api.user.getIdOne.useQuery(
    {
      email: email.data?.email as string,
    },
    { enabled: true },
  );
  useEffect(() => {
    const token = localStorage.getItem("token") as string;
    setToken(token);
  });
  //implement if user is logged in then only should run
  //should store these things as cache
  //remove un nasisarry calles

  if (userProfile.error) {
    return <div>Error loading user profile</div>;
  }

  if (userProfile.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h4>User Profile:</h4>
      <p>
        <strong>ID:</strong> {userProfile.data?.id}
      </p>
      <p>
        <strong>Username:</strong> {userProfile.data?.username}
      </p>
      <p>
        <strong>Name:</strong> {userProfile.data?.name}
      </p>
      <p>
        <strong>Email:</strong> {userProfile.data?.email}
      </p>
      <p>
        <strong>Profile Picture:</strong> {userProfile.data?.image}
      </p>
      <p>
        <strong>Token:</strong> {userProfile.data?.token}
      </p>
    </div>
  );
}
