"use client";

import { useParams } from "next/navigation";
import { api } from "~/trpc/react";

// Import statements...

export function SpecificChallenge() {
  const query = useParams<{ tag: string; id: string }>();
  console.log(query);
  if (!query) {
    return <p>No challenge query provqueryed.</p>;
  }

  const challengesQuery = api.challenge.getOneChallenge.useQuery({
    id: query.id as string,
  });

  if (challengesQuery.isLoading) {
    return <p>Loading challenge...</p>;
  }

  if (challengesQuery.error) {
    return <p>Error loading challenge: {challengesQuery.error.message}</p>;
  }

  const challenge = challengesQuery.data;

  if (!challenge) {
    return <p>Challenge not found.</p>;
  }

  return (
    <>
      <h1>{challenge.questionTitle}</h1>
      <p>{challenge.questionDescription}</p>
      <p>{challenge.questionHint}</p>
    </>
  );
}
