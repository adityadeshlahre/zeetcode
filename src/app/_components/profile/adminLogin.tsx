"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { comparePassword } from "~/utils/generateHashPass";
import { GetUserPass } from "~/utils/return";
// import { GetUserToken } from "~/server/token";
import { verifyToken } from "~/utils/generateToken";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const loginAdmin = api.admin.loginAdmin.useQuery(
    { email: email, password: password },
    {
      onSuccess: async () => {
        //function fix needed
        // const token = await GetUserToken(email);
        // // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // // @ts-ignore
        // if (!token) {1
        //   return console.log("error: token not found");
        // }
        // const verifiedToken = await verifyToken(token);

        // console.log(verifiedToken);
        // if (verifiedToken !== token) {
        //   return error;
        // }
        router.push("/");
      },
      onError: (error) => {
        console.error("Error during login:", error);
        const errorMessage =
          typeof error === "string" ? error : "An error occurred during login.";
        setError(errorMessage);
      },
      enabled: false,
    },
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const hashedpassword: string = await GetUserPass(email);
    const passwordCorrect: boolean = await comparePassword(
      password,
      hashedpassword,
    );
    if (!passwordCorrect) {
      return setError("Admin password is incorrect.");
    }
    loginAdmin.refetch();
  };

  return (
    <div className="mx-auto mt-20 max-w-md rounded-md bg-white p-6 shadow-md">
      <h1 className="mb-4 text-2xl font-semibold">Login</h1>
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
