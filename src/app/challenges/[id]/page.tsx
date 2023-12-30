"use client";
import { useRouter } from "next/navigation";
import { NextRequest } from "next/server";
import { SpecificChallenge } from "~/app/_components/challenges/getSpecificChallengesWithId";

export default function challengesWithId() {
  return (
    <div>
      Challenges with [id] loading
      <SpecificChallenge />
    </div>
  );
}
