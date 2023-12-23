"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { TAdminSchema } from "~/server/api/types";
import { generateHashedPassword } from "~/utils/generateHashPass";
import { generateToken } from "~/utils/generateToken";

export default function AdminRegister() {
  const router = useRouter();
  const [username, setUsername] = useState<TAdminSchema["username"]>("");
  const [name, setName] = useState<TAdminSchema["name"]>("");
  const [email, setEmail] = useState<TAdminSchema["email"]>("");
  const [password, setPassword] = useState<TAdminSchema["password"]>("");
  const [profilePicture, setProfilePicture] =
    useState<TAdminSchema["profilePicture"]>("");

  const createAdmin = api.admin.createAdmin.useMutation({
    onSuccess: () => {
      router.refresh();
      setUsername("");
      setEmail("");
      setName("");
      setProfilePicture("");
      setPassword("");

      router.push("/admin/login");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const hasspass = await generateHashedPassword(password);
    const token = await generateToken(email);
    try {
      createAdmin.mutate({
        username,
        email,
        name,
        profilePicture,
        token: token,
        password: hasspass,
      });
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <form
        className="mb-4 w-full max-w-md rounded bg-white px-8 pb-8 pt-6 shadow-md"
        onSubmit={handleSubmit}
      >
        <h2 className="mb-6 text-center text-2xl font-bold">
          Admin Registration
        </h2>

        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="username"
          >
            Username:
            <input
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
        </div>

        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="email"
          >
            Email:
            <input
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>

        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="name"
          >
            Name:
            <input
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        </div>

        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="profilePicture"
          >
            Profile Picture URL:
            <input
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="profilePicture"
              type="text"
              value={profilePicture}
              onChange={(e) => setProfilePicture(e.target.value)}
            />
          </label>
        </div>

        <div className="mb-6">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="password"
          >
            Password:
            <input
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>

        <div className="text-center">
          <button
            className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
            type="submit"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
