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
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const hasspass = await generateHashedPassword(password);
    const token = await generateToken(email); //token not generating fix needed
    try {
      createAdmin.mutate({
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
