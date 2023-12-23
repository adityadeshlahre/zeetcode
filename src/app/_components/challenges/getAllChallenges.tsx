"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "~/trpc/react";

export function AllChallenge() {
  const challengesQuery = api.challenge.getAllChallenges.useQuery();

  if (challengesQuery.isLoading) {
    return <p>Loading challenges...</p>;
  }

  if (challengesQuery.error) {
    return <p>Error loading challenges: {challengesQuery.error.message}</p>;
  }

  const challenges = challengesQuery.data || [];

  return (
    <>
      <ul>
        {challenges.map((challenge) => (
          <li key={challenge.id}>
            {challenge.questionTitle}
            <br />
            {challenge.questionDescription}
            <br />
            {challenge.questionHint}
          </li>
        ))}
      </ul>
    </>
  );
}
