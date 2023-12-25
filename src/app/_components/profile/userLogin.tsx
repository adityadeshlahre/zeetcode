"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { comparePassword } from "~/utils/generateHashPass";
import { GetUserId, GetUserPass } from "~/utils/return";
import { verifyToken } from "~/utils/generateToken";
import { GetUserToken } from "~/server/token";

export default function UserLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  //token and passwors issue

  const token = api.token.getUserToken.useQuery(
    { email: email },
    { enabled: false },
  );

  const hasspass = api.user.getIdOne.useQuery(
    { email: email },
    { enabled: false },
  );

  const loginUser = api.user.loginUser.useQuery(
    { email: email, password: password },
    {
      onSuccess: async () => {
        // const token = await GetUserToken(email);
        // const token1 = await GetUserId(email);
        // console.log(token.data);
        // const token2 = await GetUserPass(email);
        // console.log(token2);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const isVerified = await verifyToken(token.data?.token, email);
        if (!isVerified) {
          return console.error("User token is INVALID");
        }
        router.push("/");
      },
      onError: (error: any) => {
        console.error("Error during login:", error);
        const errorMessage =
          typeof error === "string"
            ? error
            : "An error occurred during User login.";
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
      hasspass.data?.password || "",
    );
    console.log(password, ":", hashedpassword, ":", passwordCorrect);
    if (!passwordCorrect) {
      return setError("User password is incorrect.");
    }
    await hasspass.refetch();
    await token.refetch();
    await loginUser.refetch();
  };

  return (
    <div className="mx-auto mt-20 max-w-md rounded-md bg-white p-6 shadow-md">
      <h1 className="mb-4 text-2xl font-semibold">User Login</h1>
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
