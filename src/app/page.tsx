"use client";

import Link from "next/link";

import { CreatePost } from "~/app/_components/create-post";
import { api } from "~/trpc/server";

export default async function Home() {
  return (
    <main>
      <div>
        <form onSubmit={TokenCall}></form>
      </div>
    </main>
  );
}

async function TokenCall() {}
