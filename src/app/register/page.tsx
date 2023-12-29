"use client";
import { api } from "~/trpc/server";
import UserRegister from "../_components/profile/createUser";

export default function Siginup() {
  return (
    <>
      <h1>user registration page</h1>
      <UserRegister />
    </>
  );
}
