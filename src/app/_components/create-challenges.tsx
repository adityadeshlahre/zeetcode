"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "~/trpc/react";
import { TChallengeSchema } from "~/server/api/types";

export function CreatePost() {
  const router = useRouter();
  const [name, setName] = useState("");

  const createChallenge = api.challenge.createChallenge.useMutation({
    onSuccess: () => {
      router.refresh();
      setName("");
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createChallenge.mutate({  });
      }}
      className="flex flex-col gap-2"
    >
      <input
        type="text"
        placeholder="Challenge Title"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full rounded-full px-4 py-2 text-black"
      />
      <button
        type="submit"
        className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
        disabled={createChallenge.isLoading}
      >
        {createChallenge.isLoading ? "Creating..." : "Create Challenge"}
      </button>
    </form>
  );
}
