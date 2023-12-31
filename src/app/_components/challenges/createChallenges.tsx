"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "~/trpc/react";
import { TChallengeSchema } from "~/server/api/types";
import { IsAdmin } from "~/server/token";

export function CreateChallenge() {
  const router = useRouter();
  const [id, setId] = useState<string>("");
  useEffect(() => {
    const storedId = localStorage.getItem("id") as string;
    if (!storedId) {
      console.error("Login as admin !....");
      router.push("/admin/login");
    }
    setId(storedId);
  }, [router]);

  const [code, setCode] = useState<TChallengeSchema["code"]>("");
  const [questionTitle, setQuestionTitle] =
    useState<TChallengeSchema["questionTitle"]>("");
  const [questionDescription, setQuestionDescription] =
    useState<TChallengeSchema["questionDescription"]>("");
  const [questionHint, setQuestionHint] =
    useState<TChallengeSchema["questionHint"]>("");
  const [solution, setSolution] = useState<TChallengeSchema["solution"]>("");

  const createChallenge = api.challenge.createChallenge.useMutation({
    onSuccess: () => {
      router.refresh();
      setCode("");
      setQuestionTitle("");
      setQuestionDescription("");
      setQuestionHint("");
      setSolution("");
    },
  });

  const email = api.admin.getOneAdmin.useQuery(
    { id: id as string },
    { enabled: !!id },
  );

  useEffect(() => {
    if (!email.data?.email) {
      console.error("LoggedIn user is not an Admin");
      router.replace("/admin/register");
    }
  }, [email, router]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createChallenge.mutate({
          code,
          questionTitle,
          questionDescription,
          questionHint,
          solution,
          adminId: id,
        });
      }}
      className="flex flex-col gap-4"
    >
      <input
        type="text"
        placeholder="Challenge Title"
        value={questionTitle}
        onChange={(e) => setQuestionTitle(e.target.value)}
        className="w-full rounded-full px-4 py-2 text-black"
      />
      <textarea
        placeholder="Code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="w-full rounded-md px-4 py-2 text-black"
      />
      <textarea
        placeholder="Description"
        value={questionDescription}
        onChange={(e) => setQuestionDescription(e.target.value)}
        className="w-full rounded-md px-4 py-2 text-black"
      />
      <textarea
        placeholder="Hint"
        value={questionHint}
        onChange={(e) => setQuestionHint(e.target.value)}
        className="w-full rounded-md px-4 py-2 text-black"
      />
      <textarea
        placeholder="Solution"
        value={solution}
        onChange={(e) => setSolution(e.target.value)}
        className="w-full rounded-md px-4 py-2 text-black"
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
