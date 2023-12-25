"use client";
import { NextRequest } from "next/server";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/server";

export default function UserPage() {
  return (
    <div>
      <h1>profile [id] </h1>
    </div>
  );
}
