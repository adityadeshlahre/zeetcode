"use client";
import { useRouter } from "next/router";
import { NextRequest } from "next/server";

export default function challengesWithId({ req }: { req: NextRequest }) {
  const { query } = useRouter();
  const id: string = query.id as string;

  return <div>Challenges with ID: {id} loading</div>;
}
