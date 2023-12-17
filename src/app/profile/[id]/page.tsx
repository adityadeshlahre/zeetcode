"use client";
import { NextRequest } from "next/server";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/server";

export const UserPage = ({ req }: { req: NextRequest }) => {
  const userAgent = req.headers.get("user-agent");
  return (
    <div>
      <h1>profile [id] </h1>
    </div>
  );
};

export default UserPage;
