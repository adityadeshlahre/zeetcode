"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { VerifyToken } from "~/utils/generateToken";
import { GetUserToken } from "~/server/token";

export default function CommonLogout() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const HandleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("id");
      router.push("/");
    } catch (error) {
      console.error("Error getting user token & id:", error);
      setError("An error occurred while clearning user token & id.");
    }
  };

  return (
    <div className="mx-auto mt-20 max-w-md rounded-md bg-white p-6 shadow-md">
      <h1 className="mb-4 text-2xl font-semibold">User Logout</h1>
      <form onSubmit={HandleSubmit}>
        <button
          type="submit"
          className="w-full rounded-md bg-red-500 p-2 text-white hover:bg-red-600"
        >
          Logout
        </button>
      </form>
    </div>
  );
}
