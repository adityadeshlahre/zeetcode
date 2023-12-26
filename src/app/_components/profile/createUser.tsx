"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { TUserSchema } from "~/server/api/types";
import { GenerateHashedPassword } from "~/utils/generateHashPass";
import { GenerateToken } from "~/utils/generateToken";

export default function UserRegister() {
  const router = useRouter();
  const [username, setUsername] = useState<TUserSchema["username"]>("");
  const [name, setName] = useState<TUserSchema["name"]>("");
  const [email, setEmail] = useState<TUserSchema["email"]>("");
  const [password, setPassword] = useState<TUserSchema["password"]>("");
  const [image, setImage] = useState<TUserSchema["image"]>("");

  const createUser = api.user.createUser.useMutation({
    onSuccess: () => {
      router.refresh();
      setUsername("");
      setEmail("");
      setName("");
      setImage("");
      setPassword("");
      router.push("/login");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const hasspass = await GenerateHashedPassword(password);
      const token = await GenerateToken(email);
      createUser.mutate({
        username,
        email,
        name,
        image,
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
          User Registration
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
              id="image"
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
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
