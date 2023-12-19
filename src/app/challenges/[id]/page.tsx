"use client";
import { useRouter } from "next/navigation";
import { NextRequest } from "next/server";
import { SpecificChallenge } from "~/app/_components/challenges/get-specific-challenges-with-id";

export default function challengesWithId({ req }: { req: NextRequest }) {
  return (
    <div>
      Challenges with [id] loading
      <SpecificChallenge />
    </div>
  );
}
