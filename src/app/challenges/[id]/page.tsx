"use client";
import { useRouter } from "next/navigation";
import { NextRequest } from "next/server";

export default function challengesWithId({ req }: { req: NextRequest }) {
  return <div>Challenges with [id] loading</div>;
}
