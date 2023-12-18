"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "~/trpc/react";
import { AllChallenge } from "../_components/challenges/get-all-challenges";

export default function Allhallenges() {
  return (
    <>
      <h1>All Challenges</h1>
      <AllChallenge />
    </>
  );
}
