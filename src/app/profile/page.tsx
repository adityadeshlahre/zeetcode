"use client";
import { NextRequest } from "next/server";
import UserProfile from "../_components/profile/userProfile";

export default function profile() {
  return (
    <div>
      profile loading
      <UserProfile />
    </div>
  );
}
