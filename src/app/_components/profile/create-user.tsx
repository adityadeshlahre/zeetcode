"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { TUserSchema } from "~/server/api/types";
import { generateHashedPassword } from "~/utils/generateHashPass";
import { generateToken } from "~/utils/generateToken";

export default function UserRegister() {
  const router = useRouter();
  const [username, setUsername] = useState<TUserSchema["username"]>("");
  const [name, setName] = useState<TUserSchema["name"]>("");
  const [email, setEmail] = useState<TUserSchema["email"]>("");
  const [password, setPassword] = useState<TUserSchema["password"]>("");
  const [profilePicture, setProfilePicture] =
    useState<TUserSchema["profilePicture"]>("");

  const createUser = api.user.createUser.useMutation({
    onSuccess: () => {
      router.refresh();
      setUsername("");
      setEmail("");
      setName("");
      setProfilePicture("");
      setPassword("");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const hasspass = await generateHashedPassword(password);
    const token = await generateToken(email); //token not generating fix needed
    try {
      createUser.mutate({
        username,
        email,
        name,
        profilePicture,
        password: hasspass,
        token: token,
      });
      console.error("registratation fuckedup");
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Profile Picture URL:
          <input
            type="text"
            value={profilePicture}
            onChange={(e) => setProfilePicture(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
