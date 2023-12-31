"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { ComparePassword } from "~/utils/generateHashPass";
import { GetAdminPass, GetUserPass } from "~/utils/return";
import { GetUserToken } from "~/server/token";
import { VerifyToken } from "~/utils/generateToken";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const token = api.token.getAdminToken.useQuery(
    { email: email },
    { enabled: false },
  );

  const loginAdmin = api.admin.loginAdmin.useQuery(
    { email: email, password: password },
    {
      onSuccess: async () => {
        const isVerified = await VerifyToken(token.data?.token as string);
        if (!isVerified) {
          return console.error("Admin token is INVALID");
        }
        if (!localStorage.getItem("token") || !localStorage.getItem("id")) {
          localStorage.setItem("token", token.data?.token as string);
          localStorage.setItem("id", token.data?.id as string);
        }
        router.push("/");
      },
      onError: (error: any) => {
        console.error("Error during login:", error);
        const errorMessage =
          typeof error === "string"
            ? error
            : "An error occurred during Admin login.";
        setError(errorMessage);
      },
      enabled: false,
    },
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const hashedpassword: string = await GetAdminPass(email);
    const passwordCorrect: boolean = await ComparePassword(
      password,
      hashedpassword,
    );
    if (!passwordCorrect) {
      return setError("Admin password is incorrect.");
    }
    await token.refetch();
    await loginAdmin.refetch();
  };

  return (
    <div className="mx-auto mt-20 max-w-md rounded-md bg-white p-6 shadow-md">
      <h1 className="mb-4 text-2xl font-semibold">Admin Login</h1>
      <form onSubmit={handleSubmit}>
        <label className="mb-4 block">
          <span>Email:</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-md border p-2"
          />
        </label>
        <label className="mb-4 block">
          <span>Password:</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-md border p-2"
          />
        </label>
        {error && <p className="mb-4 text-red-500">{error}</p>}
        <button
          type="submit"
          className="w-full rounded-md bg-blue-500 p-2 text-white hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
}
