"use client";
import { api } from "~/trpc/react";

export default function UserProfile() {
  const email: string = "useruser@user.user";
  const userProfile = api.user.getIdOne.useQuery({ email: email });

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
      {/* Add more fields as needed */}
    </div>
  );
}
